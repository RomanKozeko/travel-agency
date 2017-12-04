import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const styles = StyleSheet.create({
  root: {
    marginBottom: '30px'
  },
  map: {
    height: '500px',
    width: '100%',
  },
  place: {
    display: 'flex',
    alignItems: 'center'
  },
  placeMarker: {
    display: 'inline-block',
    marginRight: '10px',
    color: '#fff',
    lineHeight: '25px',
    width: '25px',
    textAlign: 'center',
    fontSize: '18px',
    backgroundColor: '#5C6BC0',
    borderRadius: '50%'
  }
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    this.directionsService = new window.google.maps.DirectionsService;
    this.directionsDisplay = new window.google.maps.DirectionsRenderer;
    let map = new window.google.maps.Map(ReactDOM.findDOMNode(this.refs.map), {
      mapTypeControl: false,
      zoom: 6,
      center: { lat: 53.90, lng:  27.43 }
    });
    this.directionsDisplay.setMap(map);

    this.autocomplete = new window.google.maps.places.Autocomplete(ReactDOM.findDOMNode(this.search), { placeIdOnly: true });
    this.autocomplete.bindTo('bounds', map);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged.bind(this));
  }

  handlePlaceChanged() {
    let places = [...this.state.places];
    const place = this.autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }

    if(!~places.findIndex(item => item.place_id === place.place_id)) {
      places.push(place);
    }

    if (places.length > 1) {
      this.calculateRoute(places);
    }

    this.search.value = '';
    this.setState({ places });
  }

  calculateRoute(places) {
    const that = this;
    let waypts = places.slice(1, places.length-1);

    waypts.forEach((item, index, array) => {
      array[index] = {
        location: { 'placeId': item.place_id },
        stopover: true
      }
    });

    this.directionsService.route({
      origin: { 'placeId': places[0].place_id },
      destination: { 'placeId': places[places.length-1].place_id },
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, (response) => {
      response.status === 'OK' ?
        that.directionsDisplay.setDirections(response)
        :
        window.alert('Directions request failed due to ' + response.status);

    });
  }

  deletePlace(id) {
    let places = [...this.state.places];
    let index = places.findIndex(item => item.place_id === id);
    places.splice(index, 1);

    if (places.length) {
      this.calculateRoute(places);
    }
    this.setState({ places });
  }

  render() {
    const { places } = this.state;
    return (
      <div className={css(styles.root)}>
        <div ref='map' className={css(styles.map)}></div>
        <TextField
          label="Добавить место"
          placeholder="Место"
          inputRef={(node => this.search = node)}
          margin="normal"
        />
        {
          places.map((item, i, array) => (
            <div key={item.place_id} className={css(styles.place)}>
              <span className={css(styles.placeMarker)}>{String.fromCharCode("A".charCodeAt(0) + i)}</span>
              {item.name}
              <IconButton onClick={() => this.deletePlace(item.place_id)}>
                <Icon>delete</Icon>
              </IconButton>
            </div>
            )
          )
        }
      </div>
    )
  }
}

export default Map;

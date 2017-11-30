import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';

const styles = StyleSheet.create({
  root: {

  },
  map: {
    height: '500px',
    width: '100%'
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

    this.autocomplete = new window.google.maps.places.Autocomplete(ReactDOM.findDOMNode(this.refs.search));
    this.autocomplete.bindTo('bounds', map);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged.bind(this));
  }

  handlePlaceChanged() {
    let places = [...this.state.places];
    const place = this.autocomplete.getPlace();

    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    places.push(place.place_id);

    if (places.length > 2) {
      this.calculateRoute(places);
    }

    this.setState({ places });
  }

  calculateRoute(places) {
    const that = this;
    let waypts = places.slice(1, places.length-1);

    waypts.forEach((item, index, array) => {
      array[index] = {
        location: { 'placeId': item },
        stopover: true
      }
    });

    this.directionsService.route({
      origin: { 'placeId': places[0] },
      destination: { 'placeId': places[places.length-1] },
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

  render() {
    return (
      <div className={css(styles.root)}>
        <input ref="search" type="text"
               placeholder="Enter a location" />
        <div ref='map' className={css(styles.map)}></div>
      </div>
    )
  }
}

export default Map;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { toastr } from 'react-redux-toastr';
import createToaster from './createToaster';
import Tooltip from 'material-ui/Tooltip';

const styles = StyleSheet.create({
  root: {
    marginBottom: '5px 0 30px',
    boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1)',
  },
  map: {
    height: '500px',
    width: '100%',
  },
  info: {
    padding: '0 5px 20px 20px',
  },
  settingsBar: {
    display: 'flex',
    justifyContent: 'space-Between',
    alignItems: 'baseline',
    marginBottom: '15px',
  },
  place: {
    display: 'flex',
    alignItems: 'center',
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
    borderRadius: '50%',
  },
  icon: {
    fontSize: '32px',
  },
  paddingRight: {
    paddingRight: '5px',
  },
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.places || [],
    };
  }

  componentDidMount() {
    this.createInitialMap();
    this.autocomplete = new window.google.maps.places.Autocomplete(
      ReactDOM.findDOMNode(this.search)
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  createInitialMap = () => {
    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsDisplay = new window.google.maps.DirectionsRenderer({
      markerOptions: { icon: '' },
    });
    this.map = new window.google.maps.Map(ReactDOM.findDOMNode(this.refs.map), {
      mapTypeControl: false,
      zoom: 6,
      center: { lat: 0, lng: 0 },
    });
    this.directionsDisplay.setMap(this.map);
    this.placesService = new window.google.maps.places.PlacesService(this.map);

    switch (this.state.places.length) {
      case 0:
        this.updateLocation();
        break;
      case 1:
        this.createMarker(this.state.places[0]);
        break;
      default:
        this.calculateRoute();
    }
  };

  updateLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  handlePlaceChanged = () => {
    let places = [...this.state.places];
    const place = this.autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }

    this.search.value = '';

    if (
      places.length &&
      places[places.length - 1].place_id === place.place_id
    ) {
      return;
    }

    places.push(place);

    if (places.length === 1) {
      this.createMarker(place);
    } else {
      this.removeMarker();
      this.calculateRoute(places);
    }

    this.setState({ places });
    this.props.save(places);
  };

  createMarker = place => {
    const create = place => {
      this.marker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: this.map,
        title: place.formatted_address,
      });
      this.map.panTo(this.marker.getPosition());
    };

    if (place.geometry) {
      create(place);
      return;
    }

    this.placesService.getDetails(
      {
        placeId: place.place_id,
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          create(place);
        }
      }
    );
  };

  calculateRoute = (places = this.state.places) => {
    const waypts = places.slice(1, places.length - 1);
    const updatedWaypoints = waypts.map(item => ({
      location: item.formatted_address,
      stopover: true,
    }));

    this.directionsService.route(
      {
        origin: places[0].formatted_address,
        destination: places[places.length - 1].formatted_address,
        waypoints: updatedWaypoints,
        travelMode: 'DRIVING',
      },
      response => {
        if (response.status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          this.resetMap();
          toastr.error('', '', createToaster('Маршрут не найден'));
        }
      }
    );
  };

  deletePlace = (place, index) => {
    let places = [...this.state.places];
    // const placeIndex = places[index].findIndex(item => item.place_id === place.place_id);
    places.splice(index, 1);
    this.setState({ places });

    switch (places.length) {
      case 0:
        this.resetMap();
        break;
      case 1:
        this.directionsDisplay.setMap(null);
        this.createMarker(places[0]);
        break;
      default:
        this.calculateRoute(places);
    }

    this.props.save(places);
  };

  removeMarker = () => {
    if (this.marker) {
      this.marker.setMap(null);
    }
  };

  resetMap = () => {
    this.removeMarker();
    this.directionsDisplay.setMap(null);
    this.setState({ places: [] });
    this.props.save([]);
  };

  render() {
    const { places } = this.state;
    return (
      <div className={css(styles.root)}>
        <div ref="map" className={css(styles.map)} />
        <div className={css(styles.info)}>
          <div className={css(styles.settingsBar)}>
            <TextField
              label="Добавить место"
              placeholder="Новое место"
              inputRef={node => (this.search = node)}
            />
            <div>
              <Tooltip title="Очистить карту" placement="bottom">
                <IconButton
                  label="Очистить карту"
                  color="primary"
                  disabled={!this.state.places.length}
                  onClick={() => this.resetMap()}
                >
                  <Icon className={css(styles.icon)}>filter_none</Icon>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          {places.map((item, i, array) => (
            <div key={item.place_id + i} className={css(styles.place)}>
              <span className={css(styles.paddingRight)}>
                <Icon>place</Icon>
              </span>
              {item.formatted_address}
              <IconButton onClick={() => this.deletePlace(item, i)}>
                <Icon>delete</Icon>
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Map;

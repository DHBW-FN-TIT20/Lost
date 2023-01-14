import React, { createRef } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import LocationMarker from "./map-assets/LocationMarker";
import UserLocationMarker from "./map-assets/UserLocationMarker";

import '../css/map.scss';
import { Button, f7 } from "framework7-react";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = createRef();
    this.locationCoordinates = createRef();
    this.userPos = null;
    this.state = {
      currentPos: {
        latlng: null,
        accuracy: 0
      },
      locationPos: null,
      isLocating: false,
      routing: null,
    };
  }

  componentDidUpdate() {
    // This part updates the route
    if (this.state.routing != null) {
      this.state.routing.setWaypoints(
        [
          this.state.currentPos.latlng,
          this.state.locationPos
        ]
      );
    }
  }

  /**
   * This function auto-detects changes to the map size and updates the map correspondingly.
   * Leaflet renders incorrectly when initializing in the background, thus this function is needed.
   */
  rerenderMap() {
    let wait = setInterval(() => {
      if (this.map.current) {
        this.map.current.invalidateSize();
        clearInterval(wait);
      }
    }, 10);
  }

  /**
   * This function is executed, when the PWA is started.
   * It first requests the user's permission to access their location on their device.
   * If permission is granted, the users current position is used and saved in a state variable.
   * For requesting the current user locations 'https' is required.
   */
  startLocalization() {
    this.setState({ isLocating: true });
    this.map.current.locate({
      watch: true,
      setView: true,
      enableHighAccuracy: true
    });
    this.map.current.addEventListener('locationfound', (e) => {
      this.state.currentPos = e.latlng;
      this.setState({ currentPos: { latlng: e.latlng, accuracy: e.accuracy } });
    });
    this.map.current.addEventListener('locationerror', (e) => {
      if (e.code == 1) {
        this.stopLocalization();
        f7.dialog.alert('App need\'s access to you\'re current location.');
      }
    })
  }

  /**
   * This function stops the tracking of the current location of the user
   */
  stopLocalization() {
    this.map.current.stopLocate();
    this.setState({ isLocating: false });
  }

  startNavigation() {
    var routing = L.Routing.control({
      waypoints: [
        this.state.currentPos.latlng ?? null,
        this.state.locationPos
      ],
      show: false,
      collapsible: false,
      createMarker: function() { return null; },
      lineOptions: {
        styles: [
          {
            //route line color
            color: '#B317C1',
          },
        ],
      }
    }).addTo(this.map.current);
    this.setState({
      routing : routing 
    });
  }

  stopNavigation() {
    this.state.routing.remove();
    this.setState({routing: null});
  }

  render() {
    return (
      <>
        <MapContainer ref={this.map} className="map" center={[52.520008, 13.404954]} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker setCoordinates={pos => this.setState({locationPos: pos})} />
          <UserLocationMarker position={this.state.currentPos} />

        </MapContainer>
        <Button onClick={() => this.state.routing ? this.stopNavigation() :  this.startNavigation() } outline className='startNavBtn'>
          { this.state.routing ? "Stop" : "Navigate" }
        </Button>
        <Button onClick={() => this.state.isLocating ? this.stopLocalization() : this.startLocalization()} className={`userPosBtn ${this.state.isLocating ? 'locating' : null}`} fill
          iconIos={this.state.isLocating ? 'f7:location_slash' : 'f7:location'} iconF7={this.state.isLocating ? 'f7:location_slash' : 'f7:location'} iconMd={this.state.isLocating ? 'f7:location_slash' : 'f7:location'} />
      </>
    )
  }
}

export default Map;
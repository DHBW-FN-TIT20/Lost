import React, { createRef } from "react";
import 'leaflet/dist/leaflet.css';
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
      isLocating: false
    }
  }

  /**
   * wait till map ist ready an trigger resize
   * -> leaflet renders incorrectly when initializing in the background
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
   * start locating user position
   * saves position data in state variable
   * request's for location access on device -> cannot access, if connected via http
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
   * stops locating user position
   */
  stopLocalization() {
    this.map.current.stopLocate();
    this.setState({ isLocating: false });
  }


  render() {
    return (
      <>
        <MapContainer ref={this.map} className="map" center={[52.520008, 13.404954]} zoom={10}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker setCoordinates={pos => this.locationCoordinates = pos} />
          <UserLocationMarker position={this.state.currentPos} />

        </MapContainer>
        <Button onClick={() => this.state.isLocating ? this.stopLocalization() : this.startLocalization()} className={`userPosBtn ${this.state.isLocating ? 'locating' : null}`} fill
          iconIos={this.state.isLocating ? 'f7:location_slash' : 'f7:location'} iconF7={this.state.isLocating ? 'f7:location_slash' : 'f7:location'} iconMd={this.state.isLocating ? 'f7:location_slash' : 'f7:location'} />
      </>
    )
  }
}

export default Map;
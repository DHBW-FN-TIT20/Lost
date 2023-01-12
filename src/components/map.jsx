import React, { createRef } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import LocationMarker from "./map-assets/LocationMarker";
import UserLocationMarker from "./map-assets/UserLocationMarker";

import '../css/map.scss';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = createRef();
    this.locationCoordinates = createRef();
    this.userCoordinates = createRef();
  }
  
  /**
   * wait till map ist ready an trigger resize
   * -> leaflet renders incorrectly when initializing in the background
   */
  rerenderMap() {
    let wait = setInterval(() => {
      if(this.map.current) {
        this.map.current.invalidateSize();
        clearInterval(wait);
      }
    }, 10);
  }

  render() {
    return (
      <MapContainer ref={this.map} className="map" center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setCoordinates={pos => this.locationCoordinates = pos} />
        <UserLocationMarker setCoordinates={pos => this.userCoordinates = pos} />
      </MapContainer>
    )
  }
}

export default Map;
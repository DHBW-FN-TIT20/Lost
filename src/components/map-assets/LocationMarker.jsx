import React from "react";
import { Marker, useMapEvents } from "react-leaflet";

/**
 * Detect Map-click event, (re)place marker
 * @param {*} props setCoordinates on parent component
 * @returns leaflet Marker
 */
function LocationMarker(props) {
  const [position, setPosition] = React.useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      props.setCoordinates(e.latlng);
      map.setView(e.latlng);
    }
  });
  const icon = L.icon({
    iconUrl: 'dist/locationMarker-263x332.png',
    iconAnchor:  [15, 40],
    iconSize: [30, 40]
  });

  return position === null ? null : (
    <Marker position={position} icon={icon} />
  )
}

export default LocationMarker;
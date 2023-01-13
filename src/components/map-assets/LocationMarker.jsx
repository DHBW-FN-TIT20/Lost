import React from "react";
import { Marker, useMapEvents } from "react-leaflet";

/**
 * This function is used to detect if a user has clicked a new position on the leaflet-map.
 * If a click has been detected, the function (re)places the current marker.
 * @param {*} props setCoordinates on parent component - based on React.RefObject
 * @returns {React.ForwardRefExoticComponent | null} leaflet Marker
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
    iconAnchor: [15, 40],
    iconSize: [30, 40]
  });

  return position === null ? null : (
    <Marker position={position} icon={icon} />
  )
}

export default LocationMarker;
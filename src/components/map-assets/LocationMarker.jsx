import React from "react";
import { Marker, useMapEvents } from "react-leaflet";

const icon = L.icon({
  iconUrl: 'dist/locationMarker-263x332.png',
  iconAnchor: [15, 40],
  iconSize: [30, 40]
});

/**
 * This function is used to detect if a user has clicked a new position on the leaflet-map.
 * If a click has been detected, the function (re)places the current marker.
 * @param {*} props setCoordinates on parent component - based on React.RefObject
 * @returns {React.ForwardRefExoticComponent | null} leaflet Marker
 */
function LocationMarker(props) {
  const map = useMapEvents({
    click(e) {
      props.handlePositionChange(e.latlng);
      map.setView(e.latlng);
    }
  });

  return props.position === null ? null : (
    <Marker position={props.position} icon={icon} />
  )
}

export default LocationMarker;
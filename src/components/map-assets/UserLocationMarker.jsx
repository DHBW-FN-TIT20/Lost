import React from "react";
import { Circle, CircleMarker } from "react-leaflet";

/**
 * Add's Location Marker on given position parameter
 * @param {*} props {latlng, accuracy} of position
 * @returns Location Marker for User Position with Accuracy Circle
 */
function UserLocationMarker(props) {
  return props.position.latlng === null ? null : (
    <>
      <Circle center={props.position.latlng ?? null} radius={props.position.accuracy / 2} />
      <CircleMarker center={props.position.latlng ?? null} fillOpacity={1} radius={10} />
    </>
  )
}

export default UserLocationMarker;
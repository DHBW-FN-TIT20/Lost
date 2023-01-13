import React from "react";
import { Button, f7 } from "framework7-react";
import { CircleMarker, useMap, useMapEvents } from "react-leaflet";

/**
 * Add's Location Marker on given position parameter
 * @param {*} props {latlng, accuracy} of position
 * @returns Location Marker for User Position with Accuracy Circle
 */
function UserLocationMarker(props) {
  return props.position.latlng === null ? null : (
    <>
      <CircleMarker center={props.position.latlng ?? null} radius={props.position.accuracy / 2} />
      <CircleMarker center={props.position.latlng ?? null} fillOpacity={1} />
    </>
  )
}

export default UserLocationMarker;
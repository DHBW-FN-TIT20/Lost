import React from "react";
import { Circle, CircleMarker } from "react-leaflet";

/**
 * This function adds a LocationMarker based on the given user position.
 * The LocationMarker contains the predicted user position with an accuracy circle, that specifies a radius in which the user should be located.
 * @param {*} props {latlng, accuracy} of user position
 * @returns {React.Fragment} rendered location marker with position of the user, plus accuracy circle
 */
function UserLocationMarker(props) {
  return props.position.latlng === null ? null : (
    <>
      <Circle center={props.position.latlng} radius={props.position.accuracy / 2} />
      <CircleMarker center={props.position.latlng} fillOpacity={1} radius={10} />
    </>
  )
}

export default UserLocationMarker;
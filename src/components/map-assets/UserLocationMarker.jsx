import React from "react";
import { CircleMarker, useMapEvents } from "react-leaflet";

/**
 * Check for Users Location and add's Location Marker
 * @param {*} props setCoordinates in parent component
 * @returns Location Marker for User Position with Accuracy Circle
 */
function UserLocationMarker(props) {
  const [position, setPosition] = React.useState(null);
  const [accuracy, setAccuracy] = React.useState(null);
  let firstLocalization = false;

  const map = useMapEvents({
    click() {
      firstLocalization = true;
      map.locate({
        watch: true,
        enableHighAccuracy: true
      });
    },
    locationfound(e) {
      if (firstLocalization) {
        map.setView(e.latlng, 10);
        firstLocalization = false;
      }
      setPosition(e.latlng);
      props.setCoordinates(e.latlng);
      setAccuracy(e.accuracy);
    }
  })

  return position === null ? null : (
    <>
      <CircleMarker center={position ?? null} radius={accuracy} />
      <CircleMarker center={position ?? null} fillOpacity={1} />
    </>
  )
}

export default UserLocationMarker;
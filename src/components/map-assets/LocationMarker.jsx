import React from "react";
import { Marker, useMapEvents } from "react-leaflet";

/**
 * Detect Map-click event, (re)place marker
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

  return position === null ? null : (
    <Marker position={position ?? null} />
  )
}

export default LocationMarker;
import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

/**
 * Create Route between two waypoints
 * @param {waypoint} start 
 * @param {waypoint} end 
 * @returns 
 */
const RoutingMachine = (props) => {
  console.log(props)
  const map = useMap();
  const instance = L.Routing.control({
    position: 'bottomright', //info panel position
    // waypoints: [start, end],
    waypoints: [
      props.start,
      props.end
    ],
    createMarker: function() { return null; },
    lineOptions: {
      styles: [
        {
          color: '#B317C1', //route line color
        },
      ],
    },
  }).addTo(map);

  return null;
};

// const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// const RoutingMachine = (props) => {
//   const map = useMap();
//   const router = L.Routing.osrmv1();
//   console.log(props);
//   let line;

//   if (props.start != null && props.end != null ) {
//     router.route(
//       [
//         { latLng: props.start },
//         { latLng: props.end }
//       ],
//       (err, routes) => {
//         console.log(line)
//         if (line != null) {
//           console.log("try to delete old version");
//           map.removeLayer(line);
//         }
//         line = L.Routing.line(routes[0]).addTo(map);
//         console.log(line);
//       }
//     )
//   }

//   return null;
// }

export default RoutingMachine;



/**
 * Call with:
    <RoutingControl 
      start={start} 
      end={end} 
    />
 */

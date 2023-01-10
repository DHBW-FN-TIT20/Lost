import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

/**
 * Create Route between two waypoints
 * @param {waypoint} start 
 * @param {waypoint} end 
 * @returns 
 */

const createRoutineMachineLayer = ({ start, end }) => {
  const instance = L.Routing.control({
    position: 'bottomright', //info panel position
    waypoints: [start, end],
    routeWhileDragging: true,
    lineOptions: {
      styles: [
        {
          color: '#B317C1', //route line color
        },
      ],
    },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

/**
 * Call with:
    <RoutingControl 
      start={start} 
      end={end} 
    />
 */

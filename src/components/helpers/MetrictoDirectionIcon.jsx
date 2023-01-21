import React from "react";
import { Icon } from "framework7-react";

const getDirectionIconFromModifier = (type, modifier) => {
  let iconType = '';
  switch (modifier) {
    case 'Continue':
    case 'Straight':
    case 'Head':
      iconType = 'arrow_up'
      break;
    case 'EndOfRoad':
      iconType = 'arrow_up_to_line'
      break;
    case 'SlightLeft':
      iconType = 'arrow_up_left'
      break;
    case 'Left':
      iconType = 'arrow_turn_up_left'
      break;
    case 'SlightRight':
      iconType = 'arrow_up_right'
      break;
    case 'Right':
      iconType = 'arrow_turn_up_right'
      break;
    default:
      if (type = 'DestinationReached') {
        iconType = 'flag'
      }
      break;
  }
  return (
    <Icon f7={iconType} />
  )
}

export default getDirectionIconFromModifier;
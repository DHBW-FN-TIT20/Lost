import { Icon } from "framework7-react";
import React, { useEffect } from "react";
import Draggable from 'react-draggable';

import '../css/modal.scss';

function SheetModal() {
  const draggable = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener('resize', positioning);
  })

  const positioning = () => {
    if (draggable.current.state.y < window.innerHeight * 0.4) {
      draggable.current.setState({y: window.innerHeight * 0.05})
    } 
    else if (draggable.current.state.y < window.innerHeight * 0.7) 
    {
      draggable.current.setState({y: window.innerHeight * 0.6});
    }
    else if (draggable.current.state.y < window.innerHeight * 0.9) {
      draggable.current.setState({y: window.innerHeight * 0.8});
    }
    else {
      draggable.current.setState({y: window.innerHeight-56-20})
    }
  }

  return (
    <Draggable ref={draggable} defaultPosition={{x: 0, y:window.innerHeight-56-20}} axis='y' bounds={{ left: 0, top: window.innerHeight*0.05, right: 0, bottom: 1200 }} onStop={() => positioning()} >
      <div className="box">
        <a className="slider" />
        <div className="modal-content">
          Move me around!
        </div>
      </div>
    </Draggable>
  )
}

export default SheetModal;
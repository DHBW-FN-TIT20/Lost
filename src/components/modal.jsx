import React from "react";
import Draggable from 'react-draggable';

import '../css/modal.scss';

class SheetModal extends React.Component {
  constructor(props) {
    super(props);
    this.draggable = React.createRef(null);
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.positioning());
  }

  positioning() {
    if (this.draggable.current.state.y < window.innerHeight * 0.4) {
      this.draggable.current.setState({y: window.innerHeight * 0.05})
    } 
    else if (this.draggable.current.state.y < window.innerHeight * 0.7) 
    {
      this.draggable.current.setState({y: window.innerHeight * 0.6});
    }
    else if (this.draggable.current.state.y < window.innerHeight * 0.9) {
      this.draggable.current.setState({y: window.innerHeight * 0.8});
    }
    else {
      this.draggable.current.setState({y: window.innerHeight-56-20})
    }
  }

  render() {
    return (
      <Draggable ref={this.draggable} defaultPosition={{x: 0, y:window.innerHeight-56-20}} axis='y' bounds={{ left: 0, top: window.innerHeight*0.05, right: 0, bottom: 1200 }} onStop={() => this.positioning()} >
      <div className="box">
        <a className="slider" />
        <div className="modal-content">
          Move me around!
        </div>
      </div>
    </Draggable>
    )
  }
}

export default SheetModal;
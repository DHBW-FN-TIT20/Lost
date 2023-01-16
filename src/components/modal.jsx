import React from "react";
import Draggable from 'react-draggable';

import '../css/modal.scss';

class SheetModal extends React.Component {
  constructor(props) {
    super(props);
    this.draggable = React.createRef(null);
    this.positions = {
      offset : 56,
      high : 0.1,
      middle: 0.6,
      low: 115,
      close: 20
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.positioning());
  }

  high() {
    this.draggable.current.setState({y: window.innerHeight * this.positions.high - this.positions.offset});
  }

  middle() {
    this.draggable.current.setState({y: window.innerHeight * this.positions.middle  - this.positions.offset});
  }

  lower() {
    this.draggable.current.setState({y: window.innerHeight - this.positions.low - this.positions.offset });
  }

  close() {
    this.draggable.current.setState({y: window.innerHeight - this.positions.close - this.positions.offset})
  }

  positioning() {
    if (this.draggable.current.state.y < window.innerHeight * 0.3) {
      this.high();
    } 
    else if (this.draggable.current.state.y < window.innerHeight * 0.7) 
    {
      this.middle();
    }
    else if (this.draggable.current.state.y < window.innerHeight * 0.9) {
      this.lower();
    }
    else {
      this.close();
    }
  }

  render() {
    return (
      <Draggable ref={this.draggable} defaultPosition={{x: 0, y: window.innerHeight - this.positions.close - this.positions.offset}} axis='y' bounds={{ left: 0, top: window.innerHeight*this.positions.high - this.positions.offset, right: 0, bottom: 1200 }} onStop={() => this.positioning()} >
      <div className="sheetModal">
        <a className="slider" />
        <div className="modal-content">
          {this.props.children}
          Move me around!
        </div>
      </div>
    </Draggable>
    )
  }
}

export default SheetModal;
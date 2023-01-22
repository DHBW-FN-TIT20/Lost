import React from "react";
import ReactDOM from "react-dom";
import Draggable from 'react-draggable';

import '../css/modal.scss';

class SheetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false
    };
    this.draggable = React.createRef(null);
    this.slider = React.createRef(null);
    this.content = React.createRef(null);
    this.positions = {
      offset: 56,
      high: 0.1,
      middle: 0.6,
      low: 115,
      close: 20
    }
  }

  /**
   * This function gets called after the component got mounted to the DOM-Tree.
   * It adds custom release events onto the component. This is done to lock the modal when the user is currently scrolling in it.
   */
  componentDidMount() {
    window.addEventListener('resize', () => this.positioning());
    // unlock the component 
    this.slider.current.addEventListener('mousedown', () => this.toggleUnlock())
    this.slider.current.addEventListener('touchstart', () => this.toggleUnlock())

    // add custom release events to handle overflow/scrolling inside the component.
    ReactDOM.findDOMNode(this.draggable.current).addEventListener('mouseup', () => this.toggleLock());
    ReactDOM.findDOMNode(this.draggable.current).addEventListener('touchend', () => this.toggleLock());
  }

  /**
   * This function positions the modal in its highest position.
   */
  high() {
    this.draggable.current.setState({ y: window.innerHeight * this.positions.high - this.positions.offset });
  }

  /**
   * This function positons the modal in its middle position.
   */
  middle() {
    this.draggable.current.setState({ y: window.innerHeight * this.positions.middle - this.positions.offset });
  }

  /**
   * This function positions the modal in its lowest position.
   */
  lower() {
    this.draggable.current.setState({ y: window.innerHeight - this.positions.low - this.positions.offset });
  }

  /**
   * This function closes the modal.
   */
  close() {
    this.draggable.current.setState({ y: window.innerHeight - this.positions.close - this.positions.offset })
  }

  /**
   * This function disables/deactivates the modal, so that dragging input will no longer be processed.
   */
  disable() {
    if (this.content.current.scrollHeight > this.content.current.clientHeight) {
      this.setState({ isDisabled: true });
    }
  }

  /**
   * This function enables the dragging of the modal.
   */
  activate() {
    if (this.state.isDisabled) {
      this.state.isDisabled = false;
      this.setState({ isDisabled: false });
    }
  }

  /**
   * This function gets called when the user lets go of the modal.
   * The function positions the modal at the next closest position: close/lower/middle/high
   */
  positioning() {
    if (this.draggable.current.state.y < window.innerHeight * 0.3) {
      this.high();
      this.disable();
    }
    else if (this.draggable.current.state.y < window.innerHeight * 0.7) {
      this.middle();
    }
    else if (this.draggable.current.state.y < window.innerHeight * 0.9) {
      this.lower();
    }
    else {
      this.close();
    }
  }

  /**
   * This function checks if the user's currently scrolling. If yes, it disables the modal.
   */
  toggleLock() {
    if (this.content.current.scrollTop > 0) {
      this.disable();
    }
  }

  /**
   * This function checks if the user has scrolled all the way to the top and enables the modal if that's the case.
   */
  toggleUnlock() {
    if (this.content.current.scrollTop == 0) {
      this.activate();
    }
  }

  render() {
    return (
      <Draggable disabled={this.state.isDisabled} onMouseDown={() => this.toggleUnlock()} ref={this.draggable} defaultPosition={{ x: 0, y: window.innerHeight - this.positions.close - this.positions.offset }} axis='y' bounds={{ left: 0, top: window.innerHeight * this.positions.high - this.positions.offset, right: 0, bottom: 1200 }} onStop={() => this.positioning()} >
        <div className='sheetModal'>
          <a ref={this.slider} className="slider" />
          <div ref={this.content} className="modal-content">
            {this.props.children}
          </div>
        </div>
      </Draggable>
    )
  }
}

export default SheetModal;
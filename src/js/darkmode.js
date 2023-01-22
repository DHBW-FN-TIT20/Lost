  import {setDarkmode} from "../js/localStorage";
  import {f7} from "framework7-react";
  
  /**
   * This function gets called if the dark mode toggle changes.
   * It changes the current dark/white mode depending on the {@link evt} parameter.
   * @param {boolean} evt - event state
   */
  function changeDarkmode(evt){
    setDarkmode(evt)
    evt ?  f7.$el.addClass('dark') : f7.$el.removeClass('dark');
  }

  export {changeDarkmode}
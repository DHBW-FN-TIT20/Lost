import React from 'react';
import {
  Page
} from 'framework7-react';
import Map from '../components/map';

// import leaflet stuff
// import nominatim stuff
// import wikipedia stuff
// import Routenberechnungs stuff

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curLoc: {
        lat: 0,
        lng: 0,
        accuracy: 0
      }
    }
  }
  componentDidMount(){
    // get current Location
    // set interval to update current Location
  }

  /**
   * This function searches for a Location by text or its OSM ID and returns the location
   * @param {string} pSearch - This is the text which is put into the search field
   * @param {string | undefined} osmID - OSM ID is a numerical identifier that is assigned to every element in the OpenStreetMap (OSM) database. 
   * (https://web.locationiq.com/glossary/osm-id)
   */
  searchLocation = async(pSearch, osmID = undefined) => {
    // if the OSM ID is undefined, use text search
  }

  /**
   * This function generates a URL with the given coordinate.
   * This URL will be used to call the nominatim API.
   * @param {Float} lat - The latitude of the coordinate
   * @param {Float} lon - The longitude of the coordinate
   */
  makeUrl(lat, lon){
    let url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json";
    return url;
  }

  /**
   * This function calls the {@link makeUrl} Method to generate a URL and sends a HTTP GET request.
   * @param {*} callback - The callback of the HTTP GET request
   * @param {Float} lat - The latitude of the coordinate
   * @param {Float} lon - The longitude of the coordinate
   */
  getJSON(callback, lat, lon) {
    let url = makeUrl(lat, lon);
  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };

  /**
   * This function calls the {@link getJSON} Method. It returns the @param location object, 
   * if the request was successfull. Else the @param err (error) will be returned.
   * @param {Float} lat - The latitude of the coordinate
   * @param {Float} lon - The longitude of the coordinate
   * 
   * @return {JSON} The location json object of the nearest location.
   */
  getLocationInfo(lat, lon){
    getJSON(
      function(err, location) {
        if (err !== null) {
          alert('Something went wrong: ' + err);
          return err;
        } else {
          console.log(location);
          return location;
        }
      }, lat, lon);
  }


  render() {
    return(
      <Page name="home" onPageInit={() => this.map.rerenderMap()}>
      {/* Page content */}
      <Map ref={instance => this.map = instance} />
    </Page>
    )
  }
}
export default Home;
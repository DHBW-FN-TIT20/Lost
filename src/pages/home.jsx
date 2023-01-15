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

  makeURL(search){
    //https://nominatim.openstreetmap.org/search?q=erbach+alb-donau-kreis&format=json
    search = "https://nominatim.openstreetmap.org/search?q="+ search + "&format=json";
    return search
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
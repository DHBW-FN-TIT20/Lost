import React from 'react';
import {
  Page,
  Searchbar,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Link,
  Toolbar,
  Block,
} from 'framework7-react';

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
        accuracy: 0,
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
   * This function  calls the nominatim API with a text search and returns a place
   * @param {*} pSearch - This is the text which is put into the search field
   */
  getLocByText = async pSearch => {
  }

  /**
   * This function calls the nominatim API with a text search and returns a place
   * @param {*} pCoordinates - These are the Coordiantes that have been put into the search field
   */
  getLocByCoords = async (pCoordinates) => {
  }

  /**
   * This function calls the nominatim API with a text search and returns a place
   * @param {*} pOsmID - OSM ID is a numerical identifier that is assigned to every element in the OpenStreetMap (OSM) database. 
   */
  getLocByOsmID = async pOsmID => {
  }

  /**
   * This funcion stores the history @param data with a @param key in the local storage.
   * @param {String} data - one new history data set
   */
  storeHistory(data){
    var actualData = JSON.parse(localStorage.getItem("history"));
    if(actualData){
      actualData.push(data);
      localStorage.setItem('history', JSON.stringify(actualData));
      console.log(actualData + " added");
    }else{
      localStorage.setItem('history', JSON.stringify(data));
      console.log(data + " added");
    }
  }

  /**
   * Returns the array of the history elements, which are stored in the local storage
   * @returns the array of the history elements
   */
  getHistory(){
    return JSON.parse(localStorage.getItem("history"));
  }

  /**
   * This funcion stores the @param data of the favorites with a @param key in the local storage.
   * @param {String} data - one new favorite data set
   */
  storeFavorite(data){
    var actualData = JSON.parse(localStorage.getItem("favorite"));
    if(actualData){
      actualData.push(data);
      localStorage.setItem('favorite', JSON.stringify(actualData));
      console.log(actualData + " added");
    }else{
      localStorage.setItem('favorite', JSON.stringify(data));
      console.log(data + " added");
    }
  }

  /**
   * Returns the array of the favorite elements, which are stored in the local storage
   * @returns the array of the favorite elements
   */
  getFavorite(){
    return JSON.parse(localStorage.getItem("favorite"));
  }



  render() {
    return(
      <Page name="home">
      {/* Top Navbar */}

      <Navbar large>
        <NavTitle>Lost</NavTitle>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>
      {/* Page content */}
      {/* Map Container */}
      {/*Wikipedia Info*/}
      {/*Adresse und andere Info */}
      <Searchbar
            style={{ height: 70, margin: 0 }}
            value={this.state.searchText}
            placeholder="Search for a place, address, or coordinates (in Format latitude, longitude please)"
            onChange={event => {
              this.setState({ searchText: event.target.value, });
            }}
          />
      <Block strong>
        <p>This is the base structure for the lost project. </p>
      </Block>

    </Page>
    )
  }
}
export default Home;
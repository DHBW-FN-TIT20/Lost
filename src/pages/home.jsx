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
   * This funcion stores the @param data with a @param key in the local storage
   * @param {*} key - The key identifier for the data (should be unique)
   * @param {*} data - The actual data to be stored
   */
  store = function(key, data){
    localStorage.setItem(key, data);
  }

  /**
   * This function reads the data related with the @param key from the local storage and returns it
   * @param {*} key 
   * @returns the data for the key
   */
  read = function(key){
    return localStorage.getItem(key);
  }

  /**
   * This function generates a random number between @param min and @param max
   * @param {*} min - The miminum value
   * @param {*} max - The maximum value
   * @returns the random number
   */
  rand(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * This function generates a random key of chars + numbers that is six character long and returns it
   * @returns the random key
   */
  randChar(){
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const randchars = [];
    for (let i = 0; i < 6; i++) {
      randchars.push(chars[rand(0, chars.length)]);
  }

  return randchars.join('');
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
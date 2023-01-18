import React from "react";
import { List, ListItem, Page, Searchbar } from "framework7-react";
import Map from "../components/map";
import { getLocationInfo, getSearchLocation } from "../js/API/nominatimAPI";
import "../css/home.scss";

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
      },
      searchResults : [],
      isSearchResults: false
    };
  }
  componentDidMount() {
    // get current Location
    // set interval to update current Location
  }

  /**
   * This function searches for a Location by text or its OSM ID and returns the location
   * @param {string} pSearch - This is the text which is put into the search field
   * @param {string | undefined} osmID - OSM ID is a numerical identifier that is assigned to every element in the OpenStreetMap (OSM) database.
   * (https://web.locationiq.com/glossary/osm-id)
   */
  searchLocation = async (pSearch, osmID = undefined) => {
    // if the OSM ID is undefined, use text search
  };

  /**
   * This function  calls the nominatim API with a text search and returns a place
   * @param {*} pSearch - This is the text which is put into the search field
   */
  getLocByText = async (pSearch) => {};

  /**
   * This function calls the nominatim API with a text search and returns a place
   * @param {*} pCoordinates - These are the Coordiantes that have been put into the search field
   */
  getLocByCoords = async (pCoordinates) => {};

  /**
   * This function calls the nominatim API with a text search and returns a place
   * @param {*} pOsmID - OSM ID is a numerical identifier that is assigned to every element in the OpenStreetMap (OSM) database.
   */
  getLocByOsmID = async (pOsmID) => {};

  updateInputValue(evt) {
    if(!this.state.isSearchResults){
      this.setState({
        isSearchResults : true
      })
    }
    const val = evt.target.value;
    getSearchLocation(val).then((props) => {
      console.log(props[0].display_name);
      this.setState({
        searchResults : props
      });
    });
  }

  render() {
    return (
      <Page name="home" onPageInit={() => this.map.rerenderMap()}>
        {/* Page content */}
        <Searchbar
          disableButtonText="Cancel"
          placeholder="Search"
          clearButton={true}
          onChange={(evt) => this.updateInputValue(evt)}
          onClickClear={() => this.setState({
            searchResults: [],
            isSearchResults : false
          })}
        ></Searchbar>
        {this.state.isSearchResults ?
        <List className="searchResults">
          {this.state.searchResults.map((item) => (<ListItem link onClick={() => console.log(item)}>{item.display_name}</ListItem>)) }
        </List> :
        null
        }
        <Map ref={(instance) => (this.map = instance)} />
      </Page>
    );
  }
}
export default Home;

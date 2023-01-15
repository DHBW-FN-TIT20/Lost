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

  makeURL(search){
    //https://nominatim.openstreetmap.org/search?q=erbach+alb-donau-kreis&format=json
    search = "https://nominatim.openstreetmap.org/search?q="+ search + "&format=json";
    return search
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
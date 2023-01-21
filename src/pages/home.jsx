import React from 'react';
import {
  Block,
  Button,
  Icon,
  List,
  ListItem,
  Page
} from 'framework7-react';
import Map from '../components/map';
import SheetModal from '../components/modal';

// helper functions
import getDirectionIconFromModifier from '../components/helpers/MetrictoDirectionIcon';
import getLocationInfo from '../js/API/nominatimAPI';
import wikiSearch from '../js/API/wikiAPI';
import formatTime from '../js/helpers/formattime';

// style sheets
import '../css/home.scss'

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
      },
      isRouting: false,
      route: null,
      article: {
        title: null,
        text: null
      },
      address: null
    };
    this.modal = React.createRef(null);
    // workaround https://github.com/react-grid-layout/react-draggable/issues/550
    this.navigateBtn = React.createRef(null);
    this.favouriteBtn = React.createRef(null);
  }

  componentDidMount() {
    // get current Location
    // set interval to update current Location

    // workaround https://github.com/react-grid-layout/react-draggable/issues/550
    this.navigateBtn.current.el.addEventListener('touchstart', () => this.handleNavigationClick());
    this.favouriteBtn.current.el.addEventListener('touchstart', () => this.handleFavouritesClick());
  }

  /**
   * This function searches for a Location by text or its OSM ID and returns the location
   * @param {string} pSearch - This is the text which is put into the search field
   * @param {string | undefined} osmID - OSM ID is a numerical identifier that is assigned to every element in the OpenStreetMap (OSM) database. 
   * (https://web.locationiq.com/glossary/osm-id)
   */
  searchLocation = async (pSearch, osmID = undefined) => {
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

  handleNavigationClick = async () => {
    this.state.isRouting ? this.map.stopNavigation() : this.map.startNavigation();
  }

  handleFavouritesClick = async () => {
  }

  getWikiInfo = async (pos) => {
    this.setState({ content: { title: 'loading...' } });
    getLocationInfo(pos.lat, pos.lng)
      .then((place) => {
        let location;
        if (place.address.city) {
          location = place.address.city
        } else if (place.address.town) {
          location = place.address.town
        } else if (place.address.village) {
          location = place.address.village
        } else {
          location = place.address.country
        }
        wikiSearch(pos.lat, pos.lng, location)
          .then((content) => {
            place.address.location = location;
            this.setState({ address: place.address, article: content })
            this.modal.current.middle();
          });
      })
  }

  render() {
    return (
      <Page name="home" className='home' onPageInit={() => this.map.rerenderMap()}>
        {/* Page content */}
        <Map ref={instance => this.map = instance} handleInstructionsUpdate={(rt) => this.setState({ route: rt })} onPositionUpdate={this.getWikiInfo} handleRouting={(state) => { this.setState({ isRouting: state }); this.modal.current.lower(); }} />
        <SheetModal ref={this.modal}>
          {!this.state.route ?
            <h3 className='article-title'>{this.state.article.title}</h3>
            :
            (
              <div className='routing-top'>
                <div className='routing-overview'>
                  <span>Title</span>
                  <div>
                    <span>Total:</span>
                    <span>
                      {(this.state.route.summary.totalDistance > 1000) ? ((this.state.route.summary.totalDistance / 1000).toFixed(2) + "km") : ((this.state.route.summary.totalDistance).toFixed(2) + "m")}
                    </span>
                    <span>
                      {formatTime(this.state.route.summary.totalTime)}
                    </span>
                  </div>
                </div>
                <List className='first-instruction'>
                  <ListItem>
                    {getDirectionIconFromModifier(this.state.route.instructions[0].type, this.state.route.instructions[0].modifier)}
                    <span>{this.state.route.instructions[0].text}</span>
                    <span>{this.state.route.instructions[0].distance}m</span>
                  </ListItem>
                </List>
              </div>
            )}
          <div ref={this.modal} className='button-select'>
            <Button ref={this.navigateBtn} onClick={this.handleNavigationClick} fill={!this.state.isRouting} outline={this.state.isRouting} className='startNavBtn'>
              {this.state.isRouting ? 'Stop' : 'Navigate'}
            </Button>
            <Button ref={this.favouriteBtn} onClick={this.handleFavouritesClick} className='favBtn' iconIos='f7:star' iconAurora='f7:star' iconMd='f7:star' outline />
          </div>
          {!this.state.route ?
            <>
              {this.state.address ?
                <Block>
                  <h3>
                    <Icon icon='f7:placemark' md='f7:placemark' aurora='f7:placemark' ios='f7:placemark' /> Adresse
                  </h3>
                  <hr />
                  <p>
                    {this.state.address.country}, {this.state.address.postcode} {this.state.address.location}, {this.state.address.house_number} {this.state.address.road}
                  </p>
                  <h3>
                    <Icon icon='f7:info_circle' md='f7:info_circle' aurora='f7:info_circle' ios='f7:info_circle' /> Info
                  </h3>
                  <hr />
                  <p>
                    {this.state.article.text}
                  </p>
                </Block> : null}
            </>
            :
            <List>
              {this.state.route.instructions.slice(1).map((instruction, index) =>
              (
                <ListItem key={index} >
                  {getDirectionIconFromModifier(instruction.type, instruction.modifier)}
                  <span>{instruction.text}</span>
                  <span>{instruction.distance}m</span>
                </ListItem>
              ))}
            </List>
          }
        </SheetModal>
      </Page>
    )
  }
}
export default Home;

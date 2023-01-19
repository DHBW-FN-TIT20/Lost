import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Page
} from 'framework7-react';
import Map from '../components/map';
import SheetModal from '../components/modal';

// helper functions
import getLocationInfo from '../js/API/nominatimAPI';
import wikiSearch from '../js/API/wikiAPI';

// style sheets
import '../css/home.scss'

// import leaflet stuff
// import nominatim stuff
// import wikipedia stuff
// import Routenberechnungs stuff

const getIcon = (type, modifier) => {
  let iconType = '';
  switch (modifier) {
    case 'Continue':
    case 'Straight':
    case 'Head':
      iconType = 'arrow_up'
      break;
    case 'EndOfRoad':
      iconType = 'arrow_up_to_line'
      break;
    case 'SlightLeft':
      iconType = 'arrow_up_left'
      break;
    case 'Left':
      iconType = 'arrow_turn_up_left'
      break;
    case 'SlightRight':
      iconType = 'arrow_up_right'
      break;
    case 'Right':
      iconType = 'arrow_turn_up_right'
      break;
    default:
      if (type = 'DestinationReached') {
        iconType = 'flag'
      }
      break;
  }
  return (
    <Icon f7={iconType} />
  )
}

const formatTime = (seconds) => {
  let date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
}

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
      address: {
      }
    }
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

  getWikiInfo = async(pos) => {
    this.setState({ content: { title: 'loading...' }});
    getLocationInfo(pos.lat, pos.lng)
      .then((place) => {
        console.log(place);
        this.setState({ address: place.address })
      })
    wikiSearch(pos.lat, pos.lng, "München")
      .then((content) => {
        this.setState({ article : content});
        this.modal.middle();
      });
  }

  render() {
    return (
      <Page name="home" className='home' onPageInit={() => this.map.rerenderMap()}>
        {/* Page content */}
        <Map ref={instance => this.map = instance} handleInstructionsUpdate={(rt) => this.setState({ route: rt })} onPositionUpdate={(pos) => this.getWikiInfo(pos)} handleRouting={(state) => { this.setState({ isRouting: state }); this.modal.lower(); }} />
        <SheetModal ref={instance => this.modal = instance}>
          {!this.state.route ?
            <h3>{this.state.article.title}</h3>
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
                    {getIcon(this.state.route.instructions[0].type, this.state.route.instructions[0].modifier)}
                    {/* <span>{this.state.instructions[0].type}</span> */}
                    <span>{this.state.route.instructions[0].text}</span>
                    <span>{this.state.route.instructions[0].distance}m</span>
                  </ListItem>
                </List>
              </div>
            )}
          <div className='button-select'>
            <Button onClick={() => this.state.isRouting ? this.map.stopNavigation() : this.map.startNavigation()} fill={!this.state.isRouting} outline={this.state.isRouting} className='startNavBtn'>
              {this.state.isRouting ? 'Stop' : 'Navigate'}
            </Button>
            <Button className='favBtn' iconIos='f7:star' iconAurora='f7:star' iconMd='f7:star' outline />
          </div>
          {!this.state.route ?
            <>
              <div>
                {this.state.address ? 
                  <>
                    <span>{this.state.address.country}</span>
                    <span>{this.state.address.postcode} {this.state.address.city}</span>
                    <span>{this.state.address.house_number} {this.state.address.road}</span>
                  </>
                : null }
              </div>
              <div>
                {this.state.article.text}
              </div>
            </>
          :
            <List>
              {this.state.route.instructions.slice(1).map((instruction, index) =>
              (
                <ListItem key={index} >
                  {getIcon(instruction.type, instruction.modifier)}
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

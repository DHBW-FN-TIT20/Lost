import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Page
} from 'framework7-react';
import Map from '../components/map';
import '../css/home.scss'
import SheetModal from '../components/modal';

import '../css/home.scss';
import wikiSearch from '../js/API/wikiAPI';

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
      content: {
        title: null,
        text: null
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

  getWikiInfo = async() => {
    this.setState({ content: { title: 'loading...' }});
    wikiSearch(this.map.state.locationPos.lat, this.map.state.locationPos.lng, "München")
      .then((content) => this.setState({ content : content}));
  }

  render() {
    return (
      <Page name="home" className='home' onPageInit={() => this.map.rerenderMap()}>
        {/* Page content */}
        <Map ref={instance => this.map = instance} handleInstructionsUpdate={(rt) => this.setState({ route: rt })} handleRouting={(state) => { this.setState({ isRouting: state }); this.modal.lower(); }} />
        <SheetModal ref={instance => this.modal = instance}>
          {!this.state.route ?
            <h3>Title</h3>
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
          {!this.state.route ? null :
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

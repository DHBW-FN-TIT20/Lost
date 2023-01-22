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
import SearchbarMap from "../components/searchbar";
import {changeDarkmode} from "../js/darkmode";
import {isDarkmodeAktive} from "../js/localStorage";

// helper functions
import getDirectionIconFromModifier from '../components/helpers/MetrictoDirectionIcon';
import { getLocationInfo } from '../js/API/nominatimAPI';
import wikiSearch from '../js/API/wikiAPI';
import formatTime from '../js/helpers/formattime';
import { getFavorite, removeFavoriteItem, storeFavorite, storeHistory, getLastPosition, resetLastPosition } from '../js/localStorage';

// style sheet
import '../css/home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRouting: false,
      route: null,
      article: {
        title: null,
        text: null
      },
      isFavourite: false,
      address: null
    };
    this.curLocation = {
      lat: null,
      lng: null
    };
    this.modal = React.createRef(null);
    // workaround https://github.com/react-grid-layout/react-draggable/issues/550
    this.navigateBtn = React.createRef(null);
    this.favouriteBtn = React.createRef(null);
  }

  /**
   * This function gets called after the component got mounted to the DOM-Tree.
   * It add's custom touch events to the buttons inside the sheet modal. The buttons won't recognize the normal onClick event on touch devices otherwise.
   * This is a workaround for the current version of react-draggable.
   */
  componentDidMount() {
    // get current Location
    // set interval to update current Location

    // workaround https://github.com/react-grid-layout/react-draggable/issues/550
    this.navigateBtn.current.el.addEventListener('touchstart', () => this.handleNavigationClick());
    this.favouriteBtn.current.el.addEventListener('touchstart', () => this.handleFavouritesClick());
  }

  /**
   * This function handels the action for clicking the navigation-start/-stop button
   * It start/stops the navigation process depending on the current routing state.
   */
  handleNavigationClick = async () => {
    this.state.isRouting ? this.map.stopNavigation() : this.map.startNavigation();
  }

  /**
   * This function handles the action for adding or removing the current location from the favorites list.
   */
  handleFavouritesClick = async () => {
    if (this.curLocation.lat && this.curLocation.lng) {
      if (this.state.isFavourite) {
        let favs = getFavorite();
        let idx = favs.findIndex(m => m.address.country == this.state.address.country
          && m.address.postcode == this.state.address.postcode
          && m.address.location == this.state.address.location
          && m.address.road == this.state.address.road
          && m.address.house_number == this.state.address.house_number);
        if (idx != -1) {
          removeFavoriteItem(idx);
          this.setState({ isFavourite: false });
        }
      } else {
        storeFavorite({ address: { country: this.state.address.country, postcode: this.state.address.postcode, location: this.state.address.location, road: this.state.address.road, house_number: this.state.address.house_number }, pos: this.curLocation });
        this.setState({ isFavourite: true });
      }
    }
  }

  /**
   * This function gets infos about the given position.
   * The function updates the state variables for address information and the available article about that position.
   * @param {LatLng} pos - 
   */
  getWikiInfo = async (pos) => {
    this.setState({ article: { title: 'Loading...' } });
    this.curLocation = { lat: pos.lat, lng: pos.lng };
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
            let favs = getFavorite();
            let isFav = favs.some(m => m.address.country == place.address.country
              && m.address.postcode == place.address.postcode
              && m.address.location == place.address.location
              && m.address.road == place.address.road
              && m.address.house_number == place.address.house_number);
            storeHistory({ address: { country: place.address.country, postcode: place.address.postcode, location: place.address.location, road: place.address.road, house_number: place.address.house_number }, pos: this.curLocation });
            this.setState({ address: place.address, article: content, isFavourite: isFav })
            this.modal.current.middle();
          });
      })
  }

  handlePageShow = () => {
    this.map.rerenderMap();
    // load last Position if available
    if (this.curLocation.lat && this.curLocation.lng) {
      let isFav = getFavorite().some(m => m.address.country == this.state.address.country
        && m.address.postcode == this.state.address.postcode
        && m.address.location == this.state.address.location
        && m.address.road == this.state.address.road
        && m.address.house_number == this.state.address.house_number);
      if (this.state.isFavourite != isFav) this.setState({ isFavourite: isFav });
    }
    let position = getLastPosition();
    if (position) this.map.setPosition(position.pos);
  }

  /**
   * This function is called on the init page. It updates the map component and checks if darkmode should be on (if yes it turns it on).
   */
  initPage = () =>{
    this.map.rerenderMap()
    var dark = isDarkmodeAktive()
    changeDarkmode(dark)
  }

  render() {
    return (
      <Page name="home" className='home' onPageTabHide={() => resetLastPosition()} onPageTabShow={this.handlePageShow} onPageInit={this.initPage}>
        {/* Page content */}
        <SearchbarMap handleSearch={(pos) => this.map.setPosition(pos)} />
        <Map ref={instance => this.map = instance} handleInstructionsUpdate={(rt) => { this.setState({ route: rt }) }} onPositionUpdate={this.getWikiInfo} handleRouting={(state) => { this.setState({ isRouting: state }); this.modal.current.lower(); }} />
        <SheetModal ref={this.modal}>
          {/* The content of the sheet modal is shown in 3 diffrent states. The route information has the highest priority. If routing is not active, information about the specified location is displayed. Otherwise nothing is displayed. */}
          {/* This upper part shows the active instructions of the routing or the heading of the article about the chosen place above the buttons. */}
          {!this.state.route ?
            <h3 className='article-title'>{this.state.article.title}</h3>
            :
            (
              <div className='routing-top'>
                <div className='routing-overview'>
                  <span>{this.state.article.title} - {this.state.address.location}, {this.state.address.house_number} {this.state.address.road}</span>
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
          {/* The control buttons are always visble. They only change state when navigation is active or depending on whether the specified location is a favorite or not. */}
          <div ref={this.modal} className='button-select'>
            <Button ref={this.navigateBtn} onClick={this.handleNavigationClick} fill={!this.state.isRouting} outline={this.state.isRouting} className='startNavBtn'>
              {this.state.isRouting ? 'Stop' : 'Navigate'}
            </Button>
            <Button ref={this.favouriteBtn} onClick={this.handleFavouritesClick} className='favBtn' iconIos={`f7:star${this.state.isFavourite ? '_fill' : null}`} iconAurora={`f7:star${this.state.isFavourite ? '_fill' : null}`} iconMd={`f7:star${this.state.isFavourite ? '_fill' : null}`} outline />
          </div>
          {!this.state.route ?
            <Block>
              {this.state.address ?
                <>
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
                </> :
                <span>Select a place on the map to find out more about it. <br />Nothing to see here...</span>
              }
            </Block>
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

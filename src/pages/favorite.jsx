import React from "react";

import { Page, BlockTitle, List, ListItem, Button, Toggle } from "framework7-react";

import {
  getFavorite,
  getHistory,
  removeFavoriteItem,
  setLastPosition,
  isDarkmodeAktive
} from "../js/localStorage";

import {changeDarkmode} from "../js/darkmode";

import '../css/favourite.scss';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      favorite: [],
      isDarkmode: false,
    };
  }

  /**
   * This function deletes a favorite, that the user has favorized before. The favorite is identified by the given index.
   * @param {Integer} index - Index of the item/favorite that will be removed
   */
  removeItemOnIndex(index) {
    removeFavoriteItem(index);
    this.loadLocalStorage();
  }

  /**
   * This function loads the history and favorite items and stores it in the local state
   */
  loadLocalStorage() {
    var hist = getHistory();
    var fav = getFavorite();
    if (!hist) {
      hist = [];
    }
    if (!fav) {
      fav = [];
    }
    this.setState({ history: hist, favorite: fav });
  }

  /**
   * This function gets called if the dark mode toggle changes.
   * sets the state and calls changeDarkmode
   * @param {boolean} evt - event state
   */
  toggleDarkmode = (evt) => {
    this.setState( { isDarkmode : !evt });
    changeDarkmode(!evt)
  }

  /**
   * This function ist called on page init. It calls loadLocalStorage and sets the state of isDarkmode
   */
  initPage = () =>{
    this.loadLocalStorage()
    var dark = isDarkmodeAktive()
    this.setState( { isDarkmode : dark });
  }

  render() {
    return (
      <Page name="favorite" className="favourites" onPageTabShow={this.initPage}> 
        <BlockTitle>Favorites</BlockTitle>
        <List simpleList className="list">
          {this.state.favorite.map((item, idx) => (
            <ListItem
              key={idx}
            >
              <div>
                <span>{item.address.location}</span>
                <span>{item.address.road} {item.address.house_number}</span>
              </div>
              <Button iconSize={20} icon="f7:trash" iconMd="f7:trash" iconIos="f7:trash" iconAurora="f7:trash" fill onClick={() => this.removeItemOnIndex(idx)} />
              <Button iconSize={20} icon="f7:placemark" iconMd="f7:placemark" iconIos="f7:placemark" iconAurora="f7:placemark" fill onClick={() => setLastPosition(item)} />
            </ListItem>
          ))}
        </List>
        <BlockTitle>Settings</BlockTitle>
        <List simpleList className="list">
          <ListItem>
            <div>Toggle Darkmode</div>
            <Toggle checked={this.state.isDarkmode} onToggleChange={this.toggleDarkmode} />
          </ListItem>
        </List>
        <BlockTitle>History</BlockTitle>
        {this.state.history.length > 0 ?
          <List simpleList className="list">
            {this.state.history.reverse().map((item, idx) => (
              <ListItem
                key={idx}
              >
                <div>
                  <span>{item.address.location}</span>
                  <span>{item.address.road} {item.address.house_number}</span>
                </div>
                <Button iconSize={20} icon="f7:placemark" iconMd="f7:placemark" iconIos="f7:placemark" iconAurora="f7:placemark" fill onClick={() => setLastPosition(item)} />
              </ListItem>
            ))}
            <ListItem className="end">History end</ListItem>
          </List> : null}
      </Page>
    );
  }
}
export default Favorite;

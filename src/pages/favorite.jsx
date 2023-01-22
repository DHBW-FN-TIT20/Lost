import React from "react";

import { Page, BlockTitle, List, ListItem, Button, Toggle, f7, f7ready } from "framework7-react";

import {
  getFavorite,
  getHistory,
  removeFavoriteItem,
  setLastPosition,
} from "../js/localStorage";

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

  /* Example JSON object structure of a favorite/history item
  favoriteItem = {
    adress: "Erbach",
    lat: 48.0,
    lon: 50.0,
  };
  */

  /**
   * This function delets Favorite with given index
   * @param {Integer} index - Index of the item that will be removed
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

  changeDarkmode = (evt) => {
    evt ? f7.$el.removeClass('dark') : f7.$el.addClass('dark');
    this.setState( { isDarkmode : !evt });
  }

  render() {
    return (
      <Page name="favorite" className="favourites" onPageTabShow={() => this.loadLocalStorage()}>
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
            <Toggle checked={this.state.isDarkmode} onToggleChange={this.changeDarkmode} />
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

import React from "react";

import { Page, BlockTitle, List, ListItem, Button } from "framework7-react";

import {
  getFavorite,
  getHistory,
  removeFavoriteItem,
  setLastPosition,
} from "../js/localStorage";

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      favorite: [],
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
  removeItemOnIndex(index){
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
      hist = ["Your history is empty!"];
    }
    if (!fav) {
      fav = ["Your favorite list is empty!"];
    }
    this.setState({ history: hist, favorite: fav });
  }

  render() {
    return (
      <Page name="favorite" onPageTabShow={() => this.loadLocalStorage()}>
        <BlockTitle>Favorites</BlockTitle>
        <List simpleList>
          {this.state.favorite.map((item, index) => (
            <ListItem
              key={item.lat + item.lon}
              title={item.adress}
              onClick={() => setLastPosition(item)}
            >
              <Button fill onClick={() => this.removeItemOnIndex(index)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
        <BlockTitle>History</BlockTitle>
        <List simpleList>
          {this.state.history.map((item) => (
            <ListItem
              key={item.lat + item.lon}
              title={item.adress}
              onClick={() => setLastPosition(item)}
            ></ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
export default Favorite;

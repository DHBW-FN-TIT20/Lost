import React from "react";

import { Page, BlockTitle, List, ListItem, Icon } from "framework7-react";

import { getFavorite, getHistory, setLastPosition } from "../js/localStorage";

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      favorite: [],
    };
  }

  //Example JSON object structure of a favorite/history item
  favoriteItem = {
    name: "Erbach",
    lat: 48.00,
    lon: 50.00
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
          {this.state.favorite.map((item) => (
            <ListItem title={item.name} onClick={() => (setLastPosition(item))}/>
          ))}
        </List>
        <BlockTitle>History</BlockTitle>
        <List simpleList>
          {this.state.history.map((item) => (
            <ListItem title={item.name} onClick={() => (setLastPosition(item))}></ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
export default Favorite;

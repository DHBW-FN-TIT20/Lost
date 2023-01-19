import React from "react";

import {
  Page,
  BlockTitle,
  List,
  ListItem,
  Icon,
} from 'framework7-react';

import {
  getFavorite,
  getHistory,
} from "../js/localStorage";

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      favorite: [],
    };
  }

  loadLocalStorage() {
    var hist = getHistory();
    var fav = getFavorite();
    if (!hist){
      hist = ['Your history is empty!']
    }
    if (!fav){
      fav = ['Your favorite list is empty!']
    }
    this.setState({ history: hist, favorite: fav });
  }

  render() {
    return (
      <Page name="favorite" onPageTabShow={() => this.loadLocalStorage()}>
        <BlockTitle>Favorites</BlockTitle>
        <List simpleList>
          {this.state.favorite.map((item) => (
            <ListItem key={item} title={item} />
          ))}
        </List>
        <BlockTitle>History</BlockTitle>
        <List simpleList>
          {this.state.history.map((item) => (
            <ListItem key={item} title={item}><Icon icon="delete_left"></Icon></ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
export default Favorite;

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

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      favorite: [],
    };
  }

  loadLocalStorage() {
    this.setState({ history: getHistory(), favorite: getFavorite() });
  }

  render() {
    return (
      <Page name="settings" onPageTabShow={() => this.loadLocalStorage()}>
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
export default Settings;

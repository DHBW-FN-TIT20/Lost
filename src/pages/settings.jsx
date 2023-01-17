import React from "react";
import {
  getHistory,
} from "../js/localStorage";
import { Page, BlockTitle, List, ListItem } from "framework7-react";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    this.setState({ history: getHistory() });
    console.log(getHistory());
  }

  render() {
    return (
      <Page name="settings">
        <BlockTitle>History</BlockTitle>
        <List simpleList>
          {this.state.history.map((item) => (
            <ListItem key={item} title={item} />
          ))}
        </List>
      </Page>
    );
  }
}
export default Settings;

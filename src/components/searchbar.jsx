import React from "react";
import { List, ListItem, Searchbar } from "framework7-react";
import { getSearchLocation } from "../js/API/nominatimAPI";
import "../css/searchbar.scss";

class SearchbarMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      isSearchResults: false,
    };
  }

  /**
   * This function updates the search results 
   * @param {*} evt - The search string
   */
  updateInputValue(evt) {
    if (!this.state.isSearchResults) {
      this.setState({
        isSearchResults: true,
      });
    }
    getSearchLocation(evt.target.value).then((props) => {
      if (props.search == evt.target.value) {
        this.setState({
          searchResults: props.location,
        });
      }
    });
  }

  render() {
    return (
      <>
        <Searchbar
          onChange={(evt) => (this.updateInputValue(evt))}
          disableButtonText="Cancel"
          placeholder="Search"
          clearButton={true}
          onClickClear={() =>
            this.setState({
              searchResults: [],
              isSearchResults: false,
            })
          }
        ></Searchbar>
        {this.state.isSearchResults ? (
          <List className="searchResults">
            {this.state.searchResults.map((item, idx) => (
              <ListItem key={idx} link onClick={() => console.log(item)}>
                {item.display_name}
              </ListItem>
            ))}
          </List>
        ) : null}
      </>
    );
  }
}

export default SearchbarMap;

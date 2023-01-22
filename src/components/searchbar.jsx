import React from "react";
import { List, ListItem, Preloader, Searchbar } from "framework7-react";
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
   * @param {*} searchEvent - The search string
   */
  updateInputValue(searchEvent) {
    if (!searchEvent.target.value) {
      if (this.state.isSearchResults) {
        this.setState({
          isSearchResults: false,
          searchResults: []
        });
        return
      }
    }
    if (!this.state.isSearchResults) {
      this.setState({
        isSearchResults: true,
      });
    }
    getSearchLocation(searchEvent.target.value).then((props) => {
      if (props.search == searchEvent.target.value) {
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
            {this.state.searchResults.length > 0 ? 
              this.state.searchResults.map((item, idx) => (
                <ListItem key={idx} link onClick={() => console.log(item)}>
                {item.display_name}
                </ListItem>
              ))
            :
            <ListItem className="loading"><Preloader /></ListItem>}
          </List>
        ) : null}
      </>
    );
  }
}

export default SearchbarMap;
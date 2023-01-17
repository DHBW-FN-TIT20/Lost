import React from 'react';
import { storeHistory, removeAllItems, storeFavorite, removeFavoriteItem, getFavorite } from '../js/localStorage';
import {
    Page
  } from 'framework7-react';

class Settings extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
        //storeFavorite(data);
        //var a = getFavorite();
        //console.log(a)
        storeFavorite("test2");
        console.log(getFavorite());       
    }

    
  

    componentDidUpdate(){
      
    }

    render() {
        return(
        <Page name="settings">
            Settings content   

        </Page>
        )
      }
}
export default Settings;
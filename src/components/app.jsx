import React from 'react';

import {
  App,
  Link,
  Page,
  Toolbar,
  View,
  Views
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

class MyApp extends React.Component {
  // Framework7 Parameters
  f7params = {
    name: 'Lost', // App name
      theme: 'auto', // Automatic theme detection
      store: store, // App store
      routes: routes, // App routes
      // Register service worker (only on production build)
      serviceWorker: 
        process.env.NODE_ENV ==='production' ? {
          path: '/service-worker.js',
        } : {},
  };


  render() {
    return (
      <App {...this.f7params} >
          {/* All of our Views */}
          <Views tabs className="safe-areas">
            <Toolbar tabbar labels bottom>
              <Link tabLink="#view-maps" tabLinkActive iconIos='f7:maps' iconAurora='f7:maps' iconMd='f7:maps' text='Maps' />
              <Link tabLink="#view-settings" iconIos='f7:gear' iconAurora='f7:gear' iconMd='f7:gear' text='Settings' />
            </Toolbar>

            <View id="view-maps" main tab tabActive url="/" />
            <View id="view-settings" tab url="/settings" />
          </Views>
      </App>
    );
  }

}
export default MyApp;
import React from 'react';

import {
  App,
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
            <View id="view-home" main tab tabActive url="/" />
          </Views>
      </App>
    );
  }

}
export default MyApp;
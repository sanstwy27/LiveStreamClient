import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import LiveTwitchStreams from './components/LiveTwitchStreams';
import LiveNginxStreams from './components/LiveNginxStreams';
import TwitchPlayer from './components/player/TwitchPlayer';
import NginxPlayer from './components/player/NginxPlayer';

const customHistory = require("history").createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={customHistory} >
          <div>
              <Navbar/>
              <Route exact path="/twitch" render={props => (
                  <LiveTwitchStreams  {...props} />
              )}/>

              <Route exact path="/twitch/:username" render={(props) => (
                  <TwitchPlayer {...props} />
              )}/>

              <Route exact path="/nginx" render={props => (
                  <LiveNginxStreams {...props} />
              )}/>

              <Route exact path="/nginx/:username" render={(props) => (
                  <NginxPlayer {...props} />
              )}/>

              {/* <Route exact path="/settings" render={props => (
                  <Settings {...props} />
              )}/> */}

              <footer className='footer mt-5 py-3 bg-dark text-white'>
                <div className='container'>Place sticky footer content here.</div>
              </footer>
          </div>
      </Router>
    );
  }
}

export default App;
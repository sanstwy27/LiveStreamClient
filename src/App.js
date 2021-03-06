import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';

import Navbar from './components/header/Navbar';
import Home from './components/body/Home';
import LiveStreams from './components/body/LiveStreams';
import TwitchPlayer from './components/component/player/TwitchPlayer';
import NginxPlayer from './components/component/player/NginxPlayer';

const customHistory = require("history").createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={customHistory} >
          <div>
              <Navbar/>

              <Route exact path="/" render={props => (
                  <Home {...props} />
              )}/>

              <Route exact path="/twitch" render={props => (
                  <LiveStreams app={"twitch"} {...props} />
              )}/>

              <Route exact path="/twitch/:username" render={(props) => (
                  <TwitchPlayer app={"twitch"} {...props} />
              )}/>

              <Route exact path="/nginx" render={props => (
                  <LiveStreams app={"nginx"} { ...props} />
              )}/>

              <Route exact path="/nginx/:username" render={(props) => (
                  <NginxPlayer app={"nginx"} {...props} />
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
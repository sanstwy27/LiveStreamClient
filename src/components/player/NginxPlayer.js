import React from 'react'
import flvjs from 'flv.js'

var mediaDataSource = {
  type: 'flv',
  url: 'http://1011.hlsplay.aodianyun.com/demo/game.flv',
  cors: true
};

var player;

class MyPlayer extends React.Component {
  state = {
    nowPlay: ""
  }

  componentDidMount() {
    console.log('isSupported: ' + flvjs.isSupported());
    var element = document.getElementsByName('videoElement')[0];
    if (typeof player !== "undefined") {
        if (player != null) {
            player.unload();
            player.detachMediaElement();
            player.destroy();
            player = null;
        }
    }
    player = flvjs.createPlayer(mediaDataSource, {
        enableWorker: false,
        lazyLoadMaxDuration: 3 * 60,
        seekType: 'range',
    });
    player.attachMediaElement(element);
    player.load();
  }

  render() {
    return (
      <div className="main-wrap">
        <div className="title">flvjs demo</div>
        <div className="video-container">
          <div>
            <video name="videoElement" className="centeredVideo" controls autoPlay poster="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png">
              Your browser is too old which doesn't support HTML5 video.
                        </video>
          </div>
        </div>
      </div>
    )
  }
}

export default MyPlayer
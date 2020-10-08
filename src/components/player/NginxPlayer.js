import React from 'react'
import flvjs from 'flv.js'
import '../../css/NginxPlayer.scss'

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

    var mediaDataSource = {
      type: 'flv',
      url: `http://localhost/flv?port=1935&app=hls&stream=${this.props.match.params.username}`,
      cors: true
    };
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
      <div className="nginx">
        <div className="video-container">
          <div>
            <video name="videoElement" className="centeredVideo" controls autoPlay poster="http://localhost:3000/nginx.png">
              Your browser is too old which doesn't support HTML5 video.
            </video>
          </div>
        </div>
      </div>
    )
  }
}

export default MyPlayer
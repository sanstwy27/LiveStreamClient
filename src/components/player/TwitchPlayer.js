import React from 'react';
import '../../css/TwitchPlayer.scss'

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';

class TwitchPlayer extends React.Component {

    componentDidMount() {
        // let embed;
        // const script = document.createElement('script');
        // script.setAttribute(
        //     'src',
        //     EMBED_URL
        // );
        // script.addEventListener('load', () => {
        //     embed = new window.Twitch.Embed("twitch-embed", {
        //         ...this.props.location.state
        //     });
        // });
        // document.body.appendChild(script);
    }

    render() {
        const { channel } = this.props.location.state;
        var videoUrl = "https://player.twitch.tv/?channel=" + channel + "&parent=localhost";
        var chatUrl = "https://www.twitch.tv/embed/" + channel + "/chat?parent=localhost";        
        return (
            // <div className="twitchPlayer">
            //     {/* <!-- Add a placeholder for the Twitch embed --> */ }
            //     <div id = "twitch-embed" > </div>
            // </div>
            <div className="twitch">
                <div className="twitch-video">
                    <iframe
                    src={videoUrl}
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true"
                    height="100%"
                    width="100%">
                    </iframe>
                </div>
                <div className="twitch-chat">
                    <iframe
                    frameborder="0"
                    scrolling="no"
                    src={chatUrl}
                    height="100%"
                    width="100%">
                    </iframe>
                </div>
            </div>
        );
    }
}

export default TwitchPlayer;
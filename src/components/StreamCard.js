import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../css/StreamCard.scss'

class StreamCard extends Component {
    render() {
        const {
            viewerCount = 0, title = "", streamerName = "", streamerAcct = "", thumbnailUrl = ""
        } = this.props.stream || {};

        return (
            <Fragment>
                {
                    this.props.app === "twitch"
                    ?
                    <div className="stream">
                        <div className="stream-title">{title}</div>
                        <Link to={{
                            pathname: '/twitch/' + streamerAcct,
                            state: {
                                channel: streamerAcct,
                                width: '100%',
                                height: '100vh'
                            }
                        }}>
                            <div className="stream-thumbnail">
                                <img src={thumbnailUrl} alt={title}/>
                            </div>
                        </Link>

                        <div className="info">
                            <div className="streamer">
                                【{streamerName}】
                            </div>
                            <div className="view-count">
                                <i className="fa fa-eye" />  {viewerCount}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="stream">
                        <div className="stream-title">{this.props.stream.streamUrl}</div>
                        <Link to={{
                            pathname: '/nginx/demo',
                            state: {
                                streamUrl: this.props.stream.streamUrl
                            }
                        }}>
                            <div className="stream-thumbnail">
                                <img src={"http://localhost:3000/nginx.png"} alt={title}/>
                            </div>
                        </Link>
                        <div className="info">
                            <div className="streamer">
                                【demo】
                            </div>
                            <div className="view-count">
                                <i className="fa fa-eye" />  {viewerCount}
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}

/**
 * {
        viewerCount: "xxx",
        title: "xxx",
        streamer: "xxx"
    }
 */
StreamCard.propTypes = {
    stream: PropTypes.shape({
        viewerCount: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        streamerName: PropTypes.string.isRequired,
        streamerAcct: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string.isRequired
    }).isRequired
};

export default StreamCard;
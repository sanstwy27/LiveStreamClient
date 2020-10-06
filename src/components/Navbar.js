import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Navbar.scss'

export default class Navbar extends React.Component {
    constructor() {
        super();
        this.state = { currentLink: "" };
        this.onClick = this.onClick.bind(this);
    }

    onClick(link) {
        this.setState({currentLink: link});
    }

    render() {
        const currentLink = this.state.currentLink;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className={'navbar-brand'}>
                    SansLive
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className={`nav-item ${currentLink === "Home" ? "active" : ""}`}>
                        <Link to={'/#'} className={'nav-link'} onClick={() => this.onClick("Home")}>
                            Home
                        </Link>
                    </li>
                    <li className={`nav-item ${currentLink === "Twitch" ? "active" : ""}`}>
                        <Link to={'/twitch/#'} className={'nav-link'} onClick={() => this.onClick("Twitch")}>
                            Twitch
                        </Link>
                    </li>
                    <li className={`nav-item ${currentLink === "Nginx" ? "active" : ""}`}>
                        <Link to={'/nginx/#'} className={'nav-link'} onClick={() => this.onClick("Nginx")}>
                            Nginx
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/#">Disabled</a>
                    </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item float-right">
                            <a className="nav-link" target="_blank" href="/#">Go Live</a>
                            {/* <Link className={'nav-link'} to={'/settings'}>
                                Go Live
                            </Link> */}
                        </li>
                        <li className="nav-item float-right">
                            <a className="nav-link" target="_blank" href="/#">Github</a>
                        </li>
                        <li className="nav-item float-right">
                            <a className="nav-link" href="/#">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
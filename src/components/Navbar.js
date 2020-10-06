import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Navbar.scss'

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={'/'} className={'navbar-brand'}>
                    SansStream
                </Link>

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
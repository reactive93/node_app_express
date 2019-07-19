import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom';


class NavBar extends Component {


    render() {
        return (
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/">
                        <i className="fas fa-code">Social Network</i>
                    </Link>
                </h1>
                <ul>
                    <li><Link to="#">Developers</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
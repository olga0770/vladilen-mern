import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";

export const Navbar = () => {

    const history = useHistory();

    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

  return (
      <nav>
          <div className="nav-wrapper green darken-3" style={{padding: '0 2rem'}}>
              <span className="brand-logo">Link modifier</span>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><NavLink to="/create">Create</NavLink></li>
                  <li><NavLink to="/links">Links</NavLink></li>
                  <li><a href="/" onClick={logoutHandler}>Logout</a></li>
              </ul>
          </div>
      </nav>
  )
};

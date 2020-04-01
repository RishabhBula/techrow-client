import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidemenu = () => {
  return (
    <div className="inner-blue-menu">
      <div className="sidemenu-group">
        <NavLink exact to="/" activeClassName="ative">
          My Library
           </NavLink>

        <NavLink to="/marketplace">
          Marketplace
          </NavLink>
      </div>

      <div className="sidemenu-group">
        <a href="mailto: contact@techrow.org" target="_blank">Contact</a>
      </div>
    </div>
  );
}

export default Sidemenu;
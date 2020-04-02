import React from 'react';
import { NavLink } from 'react-router-dom';

const TheaterSidemenu = (props) => {
    return (
        <div className="inner-blue-menu">
            <div className="sidemenu-group">
                <a className="backtomylibrary" href="#/"> <img src="/images/back-angle.png" className="img-fluid" /> My Library</a>
                <div className="my-library-modes">

                    <NavLink exact to={"/class/" + props.match.params.id + "/individual"} activeClassName="ative">
                        <img src="/images/individual-icon.png" className="img-fluid" />
                        <img src="/images/individual-icon-green.png" className="img-fluid" />
                        Individual Mode
                    </NavLink>

                    <NavLink exact to={"/class/" + props.match.params.id + "/theater"} activeClassName="ative">
                        <img src="/images/classroom-wt.png" className="img-fluid" />
                        <img src="/images/classroom-green.png" className="img-fluid" />
                        Theater
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default TheaterSidemenu;
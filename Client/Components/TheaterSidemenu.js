import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setClassMode } from '../../actions/setClassMode';
import { NavLink } from 'react-router-dom';


export class TheaterSidemenu extends Component {
    constructor(props) {
        super(props);
    }

    togglemenu(mode) {
        this.props.setClassMode("class", this.props.classMode.id, mode);
        window.location.href = '#/class/:' + this.props.classMode.id + '/:' + mode;
    }

    render() {
        return (
            <div className="inner-blue-menu">
                <div className="sidemenu-group">
                    <a className="backtomylibrary" href="#/"> <img src="/images/back-angle.png" className="img-fluid" /> My Library</a>
                    <div className="my-library-modes">

                        <NavLink exact to={"/class/" + this.props.match.params.id + "/individual"} activeClassName="ative">
                            <img src="/images/individual-icon.png" className="img-fluid" />
                            <img src="/images/individual-icon-green.png" className="img-fluid" />
                            Individual Mode
                        </NavLink>

                        <NavLink exact to={"/class/" + this.props.match.params.id + "/theater"} activeClassName="ative">
                            <img src="/images/classroom-wt.png" className="img-fluid" />
                            <img src="/images/classroom-green.png" className="img-fluid" />
                            Theater
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        classMode: state.classMode,
        userData: state.userData,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setClassMode: setClassMode }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TheaterSidemenu);
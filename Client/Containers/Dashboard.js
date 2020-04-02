import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import { Route, Switch } from 'react-router-dom';

import Header from '../Components/Header';
import MyLibrary from '../Components/MyLibrary.js';
import Academy from '../Components/Academy.js';
import Sidemenu from '../Components/Sidemenu';
import TheaterSidemenu from '../Components/TheaterSidemenu';

import Class from '../Containers/Class';
import Marketplace from '../Containers/Marketplace';
import MarketplaceDiscription from '../Containers/MarketplaceDiscription';

export default class Dashboard extends Component {

  componentWillMount() {
    ReactGA.initialize('UA-83014470-1');
    ReactGA.pageview(window.location.href)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          {/* Pages here will hide the sidemenu when selected */}
          <Route exact path="/marketplace" component={Marketplace} />
          <Route exact path="/marketplace/:id" component={MarketplaceDiscription} />

          <Fragment>
            <div className="full-page">
              <div className="inner-wrap">
                <Switch>
                  <Route exact path="/class/:id/:mode" render={TheaterSidemenu} />
                  <Route path="/" render={Sidemenu} />
                </Switch>
                <div className="inner-right-wrap">
                  {/* Pages here will have the side menu visible when selected */}
                  <Route exact path="/class/:id/:mode" component={Class} />
                  <Route path="/academy" component={Academy} />
                  <Route exact path="/" component={MyLibrary} />
                </div>
              </div>
            </div>
          </Fragment>
        </Switch>
      </Fragment>
    );
  }
}

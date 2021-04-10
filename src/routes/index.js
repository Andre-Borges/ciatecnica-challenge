import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../components/Header';
import TheSideBar from '../components/TheSideBar';

import Home from '../pages/Home';
import User from '../pages/User';

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <div className="c-app c-default-layout">
          <TheSideBar />
          <div className="c-wrapper bg-white">
            <Header />

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/user" exact component={User} />
              <Route path="/user/:id" exact component={User} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

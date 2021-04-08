import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

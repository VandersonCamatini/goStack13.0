import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

import GlobalStyle from '../styles/global';

const Routes: React.FC = () => (
  <>
    <Switch>
      <Route path="/" exact component={Dashboard}></Route>
      <Route path="/repository" component={Repository}></Route>
    </Switch>
    <GlobalStyle></GlobalStyle>
  </>
);

export default Routes;

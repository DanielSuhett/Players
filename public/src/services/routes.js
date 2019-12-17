import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';

export const Routes = () => {
  return(
    <Switch>

      //define home to private route
      <Route path="/home">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  )
}
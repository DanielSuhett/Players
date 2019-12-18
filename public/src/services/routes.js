import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { isAuth } from '../services/auth';

export const Routes = () => {
  function PrivateRoute({ component: Component, ...rest }) {
    console.log(isAuth());
    return (
            <Route
        {...rest}
        render={(props) => isAuth()
          ? (<Component {...props} /> )
          : (<Redirect to={{ pathname: '/singin', state: { from: props.location } }} />
          )
        }
      />
    )
  }

  return (
    <Switch>
      <PrivateRoute path='/home' component={Home} />
      <Route path="/singin" component={Login} />

      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  )
}
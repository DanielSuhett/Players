import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../pages/Login';
import Home from '../pages/Home';
import { isAuth } from './auth';
import NavHeader from '../components/NavHeader';

export const Routes = () => {
  function PrivateRoute({ component: Component, ...rest }) {
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
        <NavHeader />
      </Route>
    </Switch>
  )
}
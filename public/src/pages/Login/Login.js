import React, { Component } from 'react';
import './assets/login.css';
import FormAuth from '../../components/FormAuth';

class Login extends Component {
  render(){
    return (
      <div className="container">
        <form className="generalForm">
          <h1 className="titleForm">Players</h1>
          <FormAuth />
        </form>
      </div>
    );
  }
}

export default Login
import React, { Component } from 'react';
import './assets/login.css';
import FormAuth from '../../components/FormAuth';

export default class Login extends Component {
  render(){
    const hasLogin = false;
    const submitLogin = (username, password) => { 
      //verify login in api
      //if true return jwt token
    };

    if(!hasLogin){
      return (
        <div className="container">
          <form className="generalForm">
            <h1 className="titleForm">Players</h1>
            <FormAuth buttonClick={submitLogin} />
          </form>
        </div>
      );
    }
  }
}
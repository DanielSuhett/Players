import React, { Component } from 'react';
import '../../public/css/login.css';
import API from '../services/api';
import { setAuth, isAuth } from '../services/auth'
import { Redirect } from 'react-router-dom';
import FieldsFormInput from '../components/FieldsFormInput';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  postLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      if (!username && !password)
        this.setState({ message: 'Insira dados de login e senha!' });

      const response = await API.post("/singin", { username, password })

      setAuth(response.data.userToken);

      this.props.history.push("/home");

    } catch (error) {
      this.setState({ message: error });
    }
  }

  render() {
    if (!isAuth())
      return (
        <FieldsFormInput postLogin={this.postLogin} />
      );
    else
      return (<Redirect to='/home'></Redirect>)
  }
}
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

  postSingup = async (e, username, password, passwordConfirm) => {
    e.preventDefault();
    try {
      if (!username && !password)
        this.setState({ message: 'Insira dados de login e senha!' });
      else {
        if(password && !passwordConfirm)
          this.setState({ message: 'Confirme sua senha!' });
        else {
          try {
            await API.post("/singup", { username, password, passwordConfirm })
            const res = await API.post('/singin', { username, password })
            
            setAuth(res.data.userToken);
      
            this.props.history.push("/home");
          } catch (error) {
            this.setState({ message: error })
          }

        }
      }
    } catch (error) {
      this.setState({ message: error });
    }
  }

  render() {
    if (!isAuth())
      return (
        <FieldsFormInput postSingup={this.postSingup} />
      );
    else
      return (<Redirect to='/home'></Redirect>)
  }
}
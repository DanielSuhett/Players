import React, { Component } from 'react';
import './assets/login.css';
import API from '../../services/api';
import { setAuth, isAuth } from '../../services/auth'
import { Redirect } from 'react-router-dom';
import NavHeader from '../../components/NavHeader';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      message: ''
    }
  }

  postLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state
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
        <div>
          <NavHeader />

          <div className="container">
            <form className="generalForm" onSubmit={(e) => this.postLogin(e)} >
              <h1 className="titleForm">Login</h1>
              <form>
                <div className="inputForm">
                  <input className="inputField" type="text" name="username"
                    onChange={(e) => this.setState({ username: e.target.value })} placeholder=" Username" />
                </div>

                <div className="inputForm">
                  <input className="inputField" type="password" name="password"
                    onChange={(e) => this.setState({ password: e.target.value })} placeholder=" Password" />
                </div>

                <div className="inputForm buttonForm">
                  <input className="buttonField" type="submit" value="Enviar" />
                </div>
              </form>
            </form>
          </div>
        </div>

      );
    else
      return (<Redirect to='/home'></Redirect>)
  }
}
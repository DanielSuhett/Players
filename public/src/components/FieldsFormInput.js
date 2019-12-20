import React, { Component } from 'react'
import NavHeader from '../components/NavHeader';

export default class FieldsFormInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      message: ''
    }
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="container">
          <form className="generalForm" onSubmit={(e) => { 
            const { username, password, passwordConfirm } = this.state;
            this.props.postSingup 
            ? this.props.postSingup(e, username, password, passwordConfirm)
            : this.props.postLogin(e, username, password)
           }}>
            <h1 className="titleForm">{ this.props.postSingup ? 'Sing Up' : 'Login' }</h1>
            <div className="inputForm">
              <input className="inputField" type="text" name="username"
                onChange={(e) => this.setState({ username: e.target.value })} placeholder=" Username" />
            </div>

            <div className="inputForm">
              <input className="inputField" type="password" name="password"
                onChange={(e) => this.setState({ password: e.target.value })} placeholder=" Password" />
            </div>

            {this.props.postSingup
              ? <div className="inputField"><input className="inputField" type="password" name="password"
                onChange={(e) => this.setState({ passwordConfirm: e.target.value })} placeholder="Confirm password" /></div>
              : null
            }

            <div className="inputForm buttonForm">
              <input className="buttonField" type="submit" value="Enviar" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}



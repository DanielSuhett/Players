import React, { Component } from 'react'
import '../../public/css/NavHeader.css'
import {withRouter} from 'react-router-dom';
import { logout } from '../services/auth';

 class navHeader extends Component {

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="navbar">
        <span className="navTitle"><p className="Titletext">Players</p></span>
        <div className="buttonBlock">

            { this.props.ToggleAuth === 'logout' 
              ? <button className="buttonLogin" onClick={() => { logout(); return this.nextPath('/singin') } }>Logout</button>
              : <span><button className="buttonHome" onClick={() => this.nextPath('/singup') }>Sing Up</button>
              <button className="buttonLogin" onClick={() => this.nextPath('/singin') }>Login</button></span>
            }
        </div>
      </div>
    )
  }
}

export default withRouter(navHeader);

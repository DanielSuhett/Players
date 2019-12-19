import React, { Component } from 'react'
import '../../css/NavHeader.css'
import {withRouter} from 'react-router-dom';
import { logout } from '../services/auth';

 class navHeader extends Component {
   constructor(props){
     super(props); 
   }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="navbar">
        <span className="navTitle"><p className="Titletext">Players</p></span>
        <div className="buttonBlock">
            <button className="buttonHome" onClick={() => this.nextPath('/home') }>Home</button>
            { this.props.ToggleAuth === 'logout' 
              ? <button className="buttonLogin" onClick={() => { logout(); return this.nextPath('/singin') } }>Logout</button>
              : <button className="buttonLogin" onClick={() => this.nextPath('/singin') }>Login</button> 
            }
        </div>
      </div>
    )
  }
}

export default withRouter(navHeader);

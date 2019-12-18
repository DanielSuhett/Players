import React, { Component } from 'react';
import './assets/home.css';
import List from '../../components/List'
import NewPlayer from '../../components/NewPlayer';
import { logout } from '../../services/auth';
import Login from '../Login/Login';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { name: 'Daniel', games: ['Lost Ark', 'Fortnite', 'League of Legends'] },
        { name: 'Enzo', games: ['Fortnite'] }
      ]
    };
  };

  render() {
    return (
      <div className="container">
        <h1>Players <button className="logoutButton" onClick={() => { logout(this.props); this.props.history.push ("/singin"); } }>Logout</button></h1>
        
        <ul>
          <NewPlayer />
          {this.state.list.map(item => {
            return <List key={item.name} item={item} />
          })}
        </ul>
      </div>
    );
  }
} 

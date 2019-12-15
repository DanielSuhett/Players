import React, { Component } from 'react';
import './assets/home.css';
import List from '../../components/List'
import NewPlayer from '../../components/NewPlayer';

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
        <h1>Players</h1>
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

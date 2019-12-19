import React, { Component } from 'react';
import './assets/home.css';
import List from '../../components/List'
import NewPlayer from '../../components/NewPlayer';
import { logout } from '../../services/auth';
import { Redirect } from 'react-router-dom';
import API from '../../services/api';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      redirect: false
    };
  };

  async componentDidMount() {
    try {
      const res = await API.get('/players');
      res.data.map((data) => { 
        const userdata = { name: data.username, games: data.games };
        this.setState({ data: [...data, userdata] });
      });
    } catch (error) {
      this.setState({ data: [] });
      console.log(error);
    }
}

  render() {
    return this.state.redirect
      ? <Redirect to='/singin'></Redirect>
      : <div className="container">
        <h1>Players <button className="logoutButton" onClick={() => { logout(); this.setState({ redirect: true }) }}>Logout</button></h1>

        <ul>
          <NewPlayer />
          { 
          this.state.data 
          ? this.state.data.map(item => {
            return <List key={item.name} item={item} />
          })
          : null
        }
        </ul>
      </div>
  }
} 

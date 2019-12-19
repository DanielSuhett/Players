import React, { Component } from 'react';
import './assets/home.css';
import List from '../../components/List'
import NewPlayer from '../../components/NewPlayer';
import { isAuth } from '../../services/auth';
import { Redirect } from 'react-router-dom';
import API from '../../services/api';
import NavHeader from '../../components/NavHeader';


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
      for (const data of res.data) {
        const userdata = { name: data.username, games: data.games };
        this.setState({ data: [...data, userdata] });
      };
    } catch (error) {
      this.setState({ data: [] });
    }
  }

  render() {
    const ToggleAuth = isAuth() ? 'logout' : 'login'
    return this.state.redirect
      ? <Redirect to='/singin'></Redirect>
      : <div>
        <NavHeader  ToggleAuth={ToggleAuth} />
        <div className="container">
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
      </div>

  }
} 

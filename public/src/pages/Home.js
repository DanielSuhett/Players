import React, { Component } from 'react';
import '../../css/home.css';
import List from '../components/List'
import NewPlayer from '../components/NewPlayer';
import { isAuth } from '../services/auth';
import { Redirect } from 'react-router-dom';
import API from '../services/api';
import NavHeader from '../components/NavHeader';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      redirect: false
    };
  };

  async getPlayers() {
    const res = await API.get('/players');
      this.setState({ data: res.data });
  }


  componentDidMount() { this.getPlayers() }

  render() {
    const ToggleAuth = isAuth() ? 'logout' : 'login'
    return this.state.redirect
      ? <Redirect to='/singin'></Redirect>
      : <div><NavHeader ToggleAuth={ToggleAuth} />
        <div className="container">
          <div className="containerCreate"><NewPlayer handleUpdateList={() => this.getPlayers()} /></div>
          <div className="containerList">
            {
              this.state.data.length
                ?

                this.state.data.map((item, index) => {
                  return <List  key={index} item={item} />
                })
                : null
            }
          </div>
        </div>
      </div>
  }
} 

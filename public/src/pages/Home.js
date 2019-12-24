import React, { Component } from 'react';
import '../../public/css/home.css';
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
      dataUpdate: [],
      redirect: false
    };
  };

  async getPlayers() {
    const res = await API.get('/players');
    this.setState({ data: res.data });
  }

  async updateSubmit() {
    try {
      for(const updatePayload of this.state.dataUpdate){
        await API.put(`players/${updatePayload._id}`, updatePayload)
      }
      this.getPlayers()
    } catch (error) {
      console.log(error);
    }
  }


  updatePlayerName(indexItem, e) {
    const { value } = e.target
    this.setState(state => ({
      ...state,
      dataUpdate: state.data.map((item, idx) => {
        indexItem === idx
          ? item.username = value
          : item

        return item
      })
    }))

  }

  updateGame(indexItem, game_id, e) {
    const { value } = e.target

    this.setState(state => ({
      ...state,
      dataUpdate: state.data.map((item, idx) => {
        indexItem === idx
          ? item.games[game_id] = value
          : item

        return item
      })
    }))
  }

  removeGameField(indexItem, game_id, e) {
    e.preventDefault();

    this.setState(state => ({
      ...state,
      dataUpdate: state.data.map((item, idx) => {
        indexItem === idx
          ? item.games = item.games.filter((g, gindex) => { return game_id !== gindex })
          : item

        return item
      })
    }))
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
                  return <List
                    handleUpdateList={() => this.getPlayers()}
                    updateGame={(game_id, e) => this.updateGame(index, game_id, e)}
                    removeGameField={(game_id, e) => this.removeGameField(index, game_id, e)}
                    updatePlayerName={(e) => this.updatePlayerName(index, e)}
                    updateSubmit={(_id) => this.updateSubmit(_id)}
                    key={index}
                    item={item}
                  />
                })
                : null
            }
          </div>
        </div>
      </div>
  }
} 

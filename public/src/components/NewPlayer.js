import React, { Component } from 'react'
import API from '../services/api'
import Addpng from '../../images/add.png'
import Deletepng from '../../images/delete.png'


export default class NewPlayer extends Component {
  state = {
    name: '',
    game: '',
    games: [{ game: '' }],
    message: ''
  }

  gameBox(index) {
    return (
      <div className="insertGameBox">

        <input className="inputCreateGames" type="text"
          onChange={(e) => this.gameFieldChanged(index, e)} placeholder="Insira um jogo" />

        <button className="buttonItemList" onClick={(e) => this.addGameFields(e, this.state.games)} value="Criar">
          <img alt="add more one" src={Addpng} />
        </button>

        <button className="buttonItemList" onClick={() => this.removeGameFields(index)} value="Remover">
          <img alt="delete symbol" src={Deletepng} />
        </button>
      </div>
    )
  }

  gameFieldChanged(index, e) {
    this.state.games.forEach((gamefield, gindex) => {
      if (!(index !== gindex))
        this.setState({ game: Object.assign(gamefield, { game: e.target.value }) })
    });
  }

  addGameFields(e, games) {
    e.preventDefault();

    this.setState({
      'games': games.concat([{ game: '' }])
    })
  }

  removeGameFields(index) {
    this.setState({ games: this.state.games.filter((s, gindex) => index !== gindex) });
  }

  async postPlayer(e) {
    const { name } = this.state;
    const games = this.state.games.map(gamefield => gamefield.game);
    if (!name && !games)
      this.setState({ message: 'Não é possivel inserir um player vazio!' });
    else {
      if (!games)
        this.setState({ message: 'Não é possivel inserir um player sem games!' });
      else {
        try {
          await API.post('/players/create-player', { username: name, games: games });
          this.props.handleUpdateList()

        } catch (error) {
          alert(error);
        }
      }
    }
  }


  render() {
    return (
      <div className="itemBox">
        <div className="CreateBox">
          <span className="createtext"> Criar novo player</span>
        </div>
        <div className="createInputBox">
          <form onSubmit={(e) => { e.preventDefault(); this.postPlayer() }}>
            <input className="inputCreateGames" type="text" name="username"
              onChange={(e) => { this.setState({ name: e.target.value }) }} placeholder="Nome do player" />

            {this.state.games.map((gamefield, index) => {
              return <span key={index}>{this.gameBox(index)}</span>
            })
            }

            <button className="buttonSubmit" type="submit">Criar</button>
          </form>
        </div>
      </div>
    )
  }
}

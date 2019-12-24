import React, { Component } from 'react'
import API from '../services/api'

let id = 0;
export default class NewPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      game: '',
      games: [{ id: ++id, game: '' }],
      message: '',
    }
  }

  gameBox(index) {
    return (
      <div className="insertGameBox">

        <input className="inputCreateGames" type="text"
          onChange={(e) => this.gameFieldChanged(index, e)} placeholder="Insira um jogo" />

        <button className="buttonItemList" onClick={(e) => this.addGameFields(e, this.state.games)} value="Criar">
          <img alt="add more one" src="img/add.png" />
        </button>

        <button className="buttonItemList" onClick={(e) => this.removeGameFields(e, index)} value="Remover">
          <img alt="delete symbol" src="img/delete.png" />
        </button>
      </div>
    )
  }

  gameFieldChanged(index, e) {
    this.state.games.forEach((gamefield, gindex) => {
      if (index === gindex)
        this.setState({ game: Object.assign(gamefield, { game: e.target.value }) })
    });
  }

  addGameFields(e, games) {
    e.preventDefault();

    this.setState({
      games: games.concat([{ id: ++id, game: '' }])
    })
  }

  removeGameFields(e, index) {
    e.preventDefault();
    if(this.state.games.length > 1)
      this.setState(state => ({
        ...state,
        games: state.games.filter((g, gindex) => { return index !== gindex })
      }));
  }

  handleSubmit() {
    this.setState({
      name: '',
      game: '',
      games: [{ id: 0, game: '' }],
      message: '',
    });
  };

  async postPlayer() {
    const { name } = this.state;
    const games = this.state.games.map(gamefield => { if(gamefield.game != null) return gamefield.game });
    if (!name && !games)
      this.setState({ message: 'Não é possivel inserir um player vazio!' });
    else {
      try {
        await API.post('/players/create-player', { username: name, games: games });
        this.props.handleUpdateList();
        this.handleSubmit();
      } catch (error) {
        alert(error);
      }
    }

  }


  render() {
    return (
      <div className="itemBox">
        <div className="CreateBox">
          <span className="createtext">Criar novo player</span>
        </div>
        <div className="createInputBox">

          <form onSubmit={(e) => { e.preventDefault(); this.postPlayer(); }}>
            <input className="inputCreateName" type="text"
              onChange={(e) => { this.setState({ name: e.target.value }) }} value={this.state.name} placeholder="Nome do player" />

            {this.state.games.map((g, index) => {

              return <span key={g.id}>{this.gameBox(index)}</span>
            })
            }

            <button className="buttonSubmit" type="submit">Criar</button>
          </form>
        </div>
      </div>
    )
  }
}

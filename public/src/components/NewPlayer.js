import React, { Component } from 'react'
import API from '../services/api'
import Addpng from '../../images/add.png'
import Deletepng from '../../images/delete.png'

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
          <img alt="add more one" src={Addpng} />
        </button>

        <button className="buttonItemList" onClick={(e) => this.removeGameFields(e, index)} value="Remover">
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
      games: games.concat([{ id: ++id, game: '' }])
    })
  }

  removeGameFields(e, index) {
    e.preventDefault();

    const new_games = this.state.games.filter((s, gindex) => { return index !== gindex })

    if (new_games.length)
      this.setState({ games: new_games });
    else
      this.setState({ message: 'Não pode haver usuário sem jogos!' })


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
            <input required={true} className="inputCreateName" type="text" name="username"
              onChange={(e) => { this.setState({ name: e.target.value }) }} placeholder="Nome do player" />

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

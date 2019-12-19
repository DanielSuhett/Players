import React, { Component } from 'react'

export default class AddGames extends Component {
  state = {
    game: '',
    games: [{ game: '' }]
  }

  gameBox(index) {
    return (
      <div className="insertGameBox">
        <input className="inputCreateGames" type="text" name="username"
          onChange={() => this.gameFieldChanged(index)} placeholder="Adicione um jogo" />

        <button className="buttonItemList" onClick={(e) => this.addGameFields(e, this.state.games)} value="Criar">
          <img alt="sum symbol" src='add.png' />
        </button>

        <button className="buttonItemList" onClick={() => this.removeGameFields(index)} value="Remover">
          <img alt="delete symbol" src='delete.png' />
        </button>
      </div>
    )
  }

  gameFieldChanged(index, e) {
    const newGameFields = this.state.games.map((gamefield, gindex) => {
      if (index !== gindex)
        return gamefield;
      return { ...gamefield, game: e.target.value }
    });

    this.setState({ games: newGameFields })
  }

  addGameFields(e, games) {
    e.preventDefault();

    this.setState({
      'games': games.concat([{ game: '' }])
    })
  }

  removeGameFields(index) {
    this.setState({
      games: this.state.games.filter((s, gindex) => { return index !== gindex })
    });
  }

  render() {
    return (
      <div>
        {this.state.games.map((gamefield, index) => {
          return <span key={index}>{this.gameBox()}</span>
        })
        }

      </div>
    )
  }
}






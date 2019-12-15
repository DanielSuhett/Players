import React, { Component } from 'react'

class InputGame extends Component {


  render() {
    return (
      <div>
        <div className="insertGameBox">
          <input className="inputCreateGames" type="text" name="username" placeholder="Adicione um jogo" />
          <button className="buttonItemList" type="submit" value="Criar">
            <img src='add.png' />
          </button>
        </div>
      </div>
    )
  }
}

export default class AddGames extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  gameButton() {
    this.setState({ gameButton: this.state.gameButton + 1 })
  }

  render() {
      return (
        <div>
          <InputGame countGame={this.state.gameButton}/>
        </div>
      )
  }
}





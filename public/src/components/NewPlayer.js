import React, { Component, useState } from 'react'
import AddGames from './AddGames'

export default class NewPlayer extends Component {
  state = {
    buttonScope: false
  }

  buttonClick() {
    this.setState({ buttonScope: !this.state.buttonScope })
  }

  gameButton(){

  }

  render() {
    return (
      <div>
        <div className="itemBox">
          <div className="CreateBox itemList">
            <input className="inputCreate" type="text" name="username" placeholder="Criar novo player" />
            <button className="buttonItemList" type="submit" value="Criar" onClick={() => this.buttonClick()}>
              <img src='add.png' />
            </button>

          </div>
          {
            this.state.buttonScope
              ? <AddGames />
              : null
          }
        </div>
      </div>
    )
  }

}

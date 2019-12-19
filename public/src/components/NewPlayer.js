import React, { Component } from 'react'
import AddGames from './AddGames'
import ArrowDown from '/home/daniel/Projects/Players/public/images/arrow-down-purple.png'
import ArrowUp from '/home/daniel/Projects/Players/public/images/arrow-up-purple.png'

export default class NewPlayer extends Component {
  state = {
    createStatus: false
  }

  change() {
    this.setState({ createStatus: !this.state.createStatus });

  }

  render() {
    let imageurl;
    return (
        <div className="itemBox">
          <div className="CreateBox itemList">
            <input className="inputCreate" type="text" name="username" placeholder="Criar novo player" />
            <button className="buttonItemList"
              onClick={this.change.bind(this)}>
              <span className="hiddenButtonText">{this.state.createStatus ? imageurl = ArrowDown : imageurl = ArrowUp }</span>
              <img alt="arrow to display items" src={imageurl} />
            </button>

            {
              this.state.createStatus
                ? <AddGames />
                : null
            }
          </div>
        </div>
    )
  }
}

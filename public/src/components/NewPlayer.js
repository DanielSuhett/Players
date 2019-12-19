import React, { Component } from 'react'
import AddGames from './AddGames'

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
              <span className="hiddenButtonText">{this.state.createStatus ? imageurl = 'arrow-down-purple.png' : imageurl = 'arrow-up-purple.png'}</span>
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

import React, { Component } from 'react';
import API from '../services/api';
import ArrowDown from '/home/devsuhett/Projects/Players/public/images/arrow-down.png'
import ArrowUp from '/home/devsuhett/Projects/Players/public/images/arrow-up.png'
import Trash from '/home/devsuhett/Projects/Players/public/images/trash.png'
import Edit from '/home/devsuhett/Projects/Players/public/images/edit.png'
import Confirm from '/home/devsuhett/Projects/Players/public/images/confirm.png'
import Delete from '/home/devsuhett/Projects/Players/public/images/delete-white.png';

let id = 0;
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.item.username,
      game: '',
      games: this.props.item.games,
      buttonScope: false,
      clickEdit: false
    }
  }

  games = (index, game) => {
    return (
      <div className="gameBlock">
        {
          this.state.clickEdit
            ? <span>
              <input key={id} className="gameItemInput" onChange={(e) => this.gameFieldChanged(index, e)} defaultValue={game} />
              <button onClick={(e) => this.removeGameField(e, index)} className="buttonItemList"><img alt="delete game of player" src={Delete} />
              </button>
            </span>
            : <div key={game} className="gameItem">{game}</div>
        }
      </div>
    );
  }

  gameFieldChanged(index, e) {
    this.setState({ games: this.state.games.reduce((game, new_game) => 
      { new_game = e.target.value; return game + new_game }) 
    })
    console.log(this.state);
  }

  removeGameField(e, index) {
    e.preventDefault();
    const new_games = this.state.games.filter((s, gindex) => { return index !== gindex })
    if (new_games.length)
      this.setState({ games: new_games });
  }

  buttonToggle = () => {
    this.setState({ buttonScope: !this.state.buttonScope })
  }

  async submitEdit(playerid, new_data) {
    try {
      await API.put(`players/${playerid}`, new_data)
      this.props.handleUpdateList()
      this.setState({ clickEdit: !this.state.clickEdit })

    } catch (error) {
      console.log(error);
    }
  }

  removePlayer = (playerid) => {
    API.delete(`/players/${playerid}`)
    this.props.handleUpdateList()
  }

  render() {
    const { buttonScope, games } = this.state;
    const { item } = this.props;
    let imageurl;
    return (
      <div className="itemBox">
        <div className="itemList">
          {this.state.clickEdit
            ? <input className="inputEditName" onChange={(e) => this.setState({ username: e.target.value })} defaultValue={item.username} />
            : <li>{item.username}
              <button className="buttonItemList" onClick={() => { this.removePlayer(item._id) }}>
                <img alt="remove player" src={Trash} />
              </button>
              <button className="buttonItemList" onClick={() => { this.setState({ clickEdit: !this.state.clickEdit }) }} >
                <img alt="edit player" src={Edit} />
              </button>
              <button className="buttonItemList" onClick={this.buttonToggle.bind(this)}>
                <span className="hiddenButtonText">{buttonScope ? imageurl = ArrowDown : imageurl = ArrowUp}</span>
                <img alt="arrow to display items" src={imageurl} />
              </button>
            </li>
          }
          <div>
            {
              buttonScope
                ? <div className="gameList">
                  {games.map((g, index) => {
                    return <span key={index}>{this.games(index, g)}</span>
                  })
                  }
                  {this.state.clickEdit
                    ? <span className="ButtonEditList">
                      <button onClick={() => {
                        this.submitEdit(item._id, {
                          username: this.state.username,
                          games: this.state.games
                        });
                      }}>
                        <img alt="confirm edit" src={Confirm}></img>
                      </button>
                      <button onClick={() => { this.setState({ clickEdit: !this.state.clickEdit }) }}>
                        <img alt="cancel edit" src={Delete}></img>
                      </button>
                    </span>
                    : null
                  }
                </div>
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}
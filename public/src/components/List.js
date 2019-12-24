import React, { Component } from 'react';
import API from '../services/api';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGames: false,
      clickEdit: false
    }
  }

  games = (index, game) => {
    return (
      <div className="gameBlock">
        {
          this.state.clickEdit
            ? <span>
              <input className="gameItemInput" onChange={(e) => this.props.updateGame(index, e)} value={game} />
              <button onClick={(e) => this.props.removeGameField(index, e)} className="buttonItemList">
                <img alt="delete game of player" src="img/delete-white.png" />
              </button>
            </span>
            : <div key={game} className="gameItem">{game}</div>
        }
      </div>
    );
  }

  buttonToggle = (button) => {
    if (button == 'showGames')
      this.setState({ showGames: !this.state.showGames });
    if (button == 'clickEdit')
      this.setState({ clickEdit: !this.state.clickEdit })
  }

  removePlayer = (playerid) => {
    API.delete(`/players/${playerid}`)
    this.props.handleUpdateList()
  }

  render() {
    const { showGames } = this.state;
    const { item } = this.props;
    let imageurl;
    return (
      <div className="itemBox">
        <div className="itemList">
          {this.state.clickEdit
            ? <input className="inputEditName" onChange={(e) => this.props.updatePlayerName(e)} value={item.username} />
            : <li>{item.username}

              <button className="buttonItemList" onClick={() => this.buttonToggle('showGames')}>
                <span className="hiddenButtonText">{showGames ? imageurl = 'img/arrow-down.png' : imageurl = 'img/arrow-up.png'}</span>
                <img alt="arrow to display items" src={imageurl} />
              </button>

              <button className="buttonItemList" onClick={() => { this.removePlayer(item._id) }}>
                <img alt="remove player" src="img/trash.png" />
              </button>
              {
                showGames
                  ? <button className="buttonItemList" onClick={() => { this.buttonToggle('clickEdit') }} >
                    <img alt="edit player" src="img/edit.png" />
                  </button>
                  : null
              }
            </li>
          }
          <div>
            {
              showGames
                ? <div className="gameList">
                  {item.games.map((g, index) => {
                    return <span key={index}>{this.games(index, g)}</span>
                  })
                  }
                  {this.state.clickEdit
                    ? <span className="ButtonEditList">
                      <button onClick={() => {
                        this.props.updateSubmit();
                        this.buttonToggle('clickEdit');
                      }}>
                        <img alt="confirm edit" src="img/confirm.png"></img>
                      </button>
                      <button onClick={() => { this.buttonToggle('clickEdit'); this.props.handleUpdateList() }}>
                        <img alt="cancel edit" src="img/delete-white.png"></img>
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
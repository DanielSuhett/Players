import React, { Component } from 'react';
import ArrowDown from '/home/devsuhett/Projects/Players/public/images/arrow-down.png'
import ArrowUp from '/home/devsuhett/Projects/Players/public/images/arrow-up.png'


export default class List extends Component {
  state = {
    buttonScope: false
  }

  games = (item) => {
    return (
      <div className="gameBlock">
        {item.games.map(game => (
          <div key={game} className="gameItem">{game}</div>
        ))
        }
      </div> 
    );
  }

  buttonToggle = () => {
    this.setState({ buttonScope: !this.state.buttonScope })
  }

  render() {
    const { buttonScope } = this.state;
    const { item } = this.props;
    let imageurl;
    return (
      <div className="itemBox">
          <div className="itemList">
            <li>{item.username}</li>
            <button className="buttonItemList" onClick={this.buttonToggle.bind(this)}>
              <span className="hiddenButtonText">{ buttonScope ? imageurl = ArrowDown : imageurl = ArrowUp }</span>
              <img alt="arrow to display items" src={imageurl}/>
            </button>
            <div>
              {
                buttonScope
                  ? <div className="gameList">{this.games(item)}</div>
                  : null
              }
            </div>
          </div>
      </div>
    )
  }
}
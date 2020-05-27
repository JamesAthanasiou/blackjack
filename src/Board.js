import React, { Component } from 'react';
import Hand from './Hand';
import Deck from './Deck';
import './Board.css';

class Board extends Component{
  render() {
    return (
      <div className='container'>
          <Deck />
      </div>
    )
  }
}

export default Board;
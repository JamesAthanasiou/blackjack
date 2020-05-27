import React, { Component } from 'react';
// import Card from './Card';
import Hand from './Hand';
import axios from 'axios';
import './Deck.css';

const API_BASE_URL = 'http://deckofcardsapi.com/api/deck'; 
const numHands = 2;

class Deck extends Component{
  constructor(props){
    super(props);
    this.state = {
      deck: null,
      gameState: 0,
    };
  }

  async componentDidMount(){
    this.newGame();
  }

  async newGame() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState(st => ({
      deck: deck.data
    }));
  }

  render() {
    const hands = [];
    for (let i = 0; i < numHands; i++){
      hands.push(<Hand API_BASE_URL={API_BASE_URL} deck={this.state.deck}/>)
    }
    return (
        <div className='Deck'>
          <h1 class='Deck-title'>Blackjack</h1>
          <p class='subtitle'> Try to beat the dealer by getting 21</p>
          <button className='Deck-btn' onClick={this.newGame}>New Game</button>
          <div class='Hand-area'>
            {hands}
          </div>
        </div>
    )
  }
}

export default Deck;
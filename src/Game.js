import React, { Component } from 'react';
import Hand from './Hand';
import axios from 'axios';
import './Game.css';

const API_BASE_URL = 'http://deckofcardsapi.com/api/deck'; 
// TODO. Use socket.io to add multiple players. For now just 1 player.
const numHands = 1;

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      deck: null,
      gameState: 0,
    };
    this.newGame = this.newGame.bind(this);
  }

  // TODO: clear old cards
  async componentDidMount(){
    await this.newGame();
  }

  async newGame() {
    // Blackjack uses 6 decks as standard.
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=6`);
    this.setState(() => ({
      deck: deck.data
    }));
  }

  render() {
    const hands = [];
    // Add dealer hand first
    hands.push(<Hand API_BASE_URL={API_BASE_URL} deck={this.state.deck} dealer={false} />)
    // Add player hands
    for (let i = 0; i < numHands; i++){
      hands.push(<Hand API_BASE_URL={API_BASE_URL} deck={this.state.deck} dealer={false} />)
    }

    return (
      <div className='Game'>
        <h1 className='Game-title'>Blackjack</h1>
        <p className='subtitle'> Try to beat the dealer by getting 21</p>
        <button className='Game-btn' onClick={this.newGame}>New Game</button>
        <div className='Hand-area'>
          {hands}
        </div>
      </div>
    )
  }
}

export default Game;
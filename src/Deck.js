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
    this.state = {deck: null};
  }

  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({deck: deck.data});
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
          {hands}
        </div>
    )
  }
}

export default Deck;
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
    this.state = {deck: null, drawn:[]};
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({deck: deck.data});
  }

  async getCard(){
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success){
        throw new Error("No more cards");
      } else {
        let card = cardRes.data.cards[0];
        this.setState(st => ({
          drawn: [
            // take all objects in array of drawn cards and add the new card obj
            ...st.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.value} of ${card.suit}`
            }
          ]
        }));
      }
    } catch (err){
      // TODO
      alert(err);
    }
  }


  render() {
    const hands = [];
    for (let i = 0; i < numHands; i++){
      hands.push(<Hand API_BASE_URL={API_BASE_URL} deck={this.state.deck}/>)
    }
    // build array of card props
    // const cards = this.state.drawn.map ( c =>(
    //   <Card key={c.id} name={c.name} image={c.image}/>
    // ))
    return (
        <div className='Deck'>
          {/* <h1 className='Deck-title'>Card Dealer</h1>
          <button className='Deck-btn' onClick={this.getCard}>Get Card</button>
          <div className='Deck-Card-Area'>{cards}</div> */}
          {hands}
        </div>
    )
  }
}

export default Deck;
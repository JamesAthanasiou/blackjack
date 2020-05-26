import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';

class Hand extends Component{
  constructor(props){
      super(props);
      this.state = {deck: null, drawn:[]};
      this.getCard = this.getCard.bind(this);
  }

  async getCard(){
    let deck_id = this.props.deck.deck_id;
    try {
      let cardUrl = `${this.props.API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      console.log(cardRes.data.remaining);

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
      console.log(err);
    }
  }

  render() {

    // build array of card props
    const cards = this.state.drawn.map ( c =>(
      <Card key={c.id} name={c.name} image={c.image}/>
    ))
  
    return (
      <div>
        <div className='Deck-Card-Area'>
          <div className='Deck-Card-Area'>{cards}</div>
        </div>
        <button className='Deck-btn' onClick={this.getCard}>Hit Me</button>
      </div>
    )
  }
}
  
export default Hand;
import React, { Component } from 'react';
import Card from './Card';
import LoserBanner from './LoserBanner';
import axios from 'axios';
import './Hand.css';

class Hand extends Component{
  constructor(props){
    super(props);
    this.state = {deck: this.props.deck, drawn:[], total: 0, lose: false};
    this.getCard = this.getCard.bind(this);
  }
  // TODO deck hasn't loaded yet, wont work
  // async componentDidMount(){
  //   this.getCard();
  //   this.getCard();
  // }
  async getCard(){
    let deck_id = this.props.deck.deck_id;
    try {
      let cardUrl = `${this.props.API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      console.log(`Cards remaining: ${cardRes.data.remaining}`);

      if (!cardRes.data.success){
        throw new Error("No more cards");
      } else {
        let card = cardRes.data.cards[0];
        var cardAbsValue = 0;
        if (['KING', 'QUEEN', 'JACK'].some(res => res.includes(card.value))) {
          cardAbsValue = 10;
        } else if ('ACE' === card.value){
          cardAbsValue = 11;
        }
        
        else {
          cardAbsValue = card.value;
        }
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
        this.setState(st => ({
          total: st.total + parseInt(cardAbsValue)
        }));
      }
      console.log(`Current total: ${this.state.total}`);
    } catch (err){
      console.log(err);
    }

    // TODO: Broken, says you lose before it displays 21.
    if (this.state.total > 21){
      // TODO: Add condition that if bust with an ace, take off 10 from total
      this.setState(st => ({
        lose: true
      }));
      this.lose();
    } else if (this.state.total === 21){
      this.win();
    }
  }

  // TODO
  lose() {
    console.log("You Lose")
  }

  // TODO
  stay(){
    console.log('stay');
  }

  //TODO
  // set up dealer and include win conditions other than just hitting 21
  win() {
    if (this.state.total === 21){
      alert('BLACKJACK! YOU WIN!');
    } else {
      alert('You Win!');
    }
  }

  render() {
    // build array of card props
    const cards = this.state.drawn.map ( c =>(
      <Card key={c.id} name={c.name} image={c.image}/>
    ));
    let banner;
    if (this.state.lose === true) {
      banner = <LoserBanner />
    } else {
      banner = null;
    }

    return (
      <div class='Hand'>
        <div className='Hand-Card-Area'>{cards}</div>
        <button className='Hand-btn' onClick={this.getCard}>Hit Me</button>
        <button className='Hand-btn' onClick={this.stay} disabled>Stay</button>
        {banner}
      </div>
    )
  }
}
  
export default Hand;
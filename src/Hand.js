import React, { Component } from 'react';
import Card from './Card';
import LoserBanner from './LoserBanner';
import axios from 'axios';
import './Hand.css';

class Hand extends Component{
  constructor(props){
    super(props);
    this.state = {deck: this.props.deck, dealer: this.props.deck, drawn:[], total: 0, lose: false, win: false, aceCount: 0};
    this.getCard = this.getCard.bind(this);
  }
  // TODO deck hasn't loaded yet, wont work. Find something smarter than using timeout.
  componentDidMount(){
    // This doesn't work
    // await this.getCard();
    
    setTimeout( () => {    
      this.getCard();
      this.getCard();}, 400);
  }

  componentDidUpdate() {
    // TODO: Broken, says you lose even with an ace.
    if (this.state.total > 21){
      this.state.drawn.forEach(card => {
        console.log('a');
        console.log(this.state.aceCount);
        if ((card.value === "ACE") && (this.state.aceCount > 0)) {
          console.log('Has ACE');
          this.setState ( st => ({
            total: st.total - 10,
            aceCount: st.aceCount - 1
          }));
          console.log("Reduced count");
          console.log(this.state.total);
        }
      });
      // TODO: it appears that although the the above block of code is executed, the state is not actually updated yet and this will still be considered a loss.
      // Recheck after turning ace into a 1. Must also check that lose is false, otherwise will end up in a infinite component updating loop.
      if ((this.state.total > 21) &&  (this.state.lose === false)) {
        console.log(`lose with ${this.state.total}`);
        this.lose();
      }
    } else if (this.state.total === 21){
      this.win();
    }
  }

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
              name: `${card.value} of ${card.suit}`,
              value: card.value
            }
          ]
        }));
        this.setState(st => ({
          total: st.total + parseInt(cardAbsValue)
        }));
        if (card.value === "ACE") {
          this.state.aceCount++;
          console.log(`Ace Count is ${this.state.aceCount}`);
        }
      }
      console.log(`Current total: ${this.state.total}`);
    } catch (err){
      console.log(err);
    }
  }

  // TODO
  lose() {
    this.setState( st => ({
      lose: true
    }));
    console.log("You Lose");
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
  
  /* DEALER METHODS */

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
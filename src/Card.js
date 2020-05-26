import React, { Component } from 'react'
import './Card.css'

class Card extends Component {
  constructor(props){
    super(props);
    // let angle = Math.random() * 25 - 25 ;
    // let xPos = Math.random()  * 20 - 20;
    // let yPos = Math.random() * 20 - 20;
    // // standars naming convention for css
    // this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }
  render() {
    return (
    //   <img style={{transform : this._transform}}className='Card' src={this.props.image} alt={this.props.name}/>
      <img className='Card' src={this.props.image} alt={this.props.name}/>
    )
  }
}

export default Card;
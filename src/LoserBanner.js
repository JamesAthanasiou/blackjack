import React, { Component } from 'react';
import './LoserBanner.css';

class LoserBanner extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div class='loser'>
        You Busted!
      </div>
    )
  }
}

export default LoserBanner;
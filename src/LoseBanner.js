import React, { Component } from 'react';
import './LoseBanner.css';

class LoseBanner extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div class='LoseBanner'>
        You Busted!
      </div>
    )
  }
}

export default LoseBanner;
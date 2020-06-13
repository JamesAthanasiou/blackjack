import React, { Component } from 'react';
import './WinBanner.css';

class WinBanner extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div class='WinBanner'>
        You have winnered
      </div>
    )
  }
}

export default WinBanner;
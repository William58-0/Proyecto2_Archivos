import React, { Component } from 'react';
import Pdf from "./file.pdf";

class Home extends Component {
  onResumeClick() {
    window.open(Pdf);
  }
  
  render() {

    return (
      <a onClick={this.onResumeClick}>
      Resume
   </a>
    );
  }
}

export default Home;
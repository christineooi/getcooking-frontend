import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import '../App.css';
import { backendurl } from '../config';

class App extends Component {

  handleClick = e => {
    console.log("button clicked!");
    e.preventDefault();
    fetch(backendurl+"/categories")
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

  render() {
    return (
      <div>
        <h4>Welcome to Get Cooking!</h4>
        <p>
          <button onClick={this.handleClick}>Test</button>
        </p>
      </div>
    );
  }
}

export default App;

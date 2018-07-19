import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import '../App.css';
import LoginRegister from './LoginRegister';
import HeaderNav from './HeaderNav';
import Recipes from './Recipes'
// import { backendurl } from '../config';

class App extends Component {

  // handleClick = e => {
  //   console.log("button clicked!");
  //   e.preventDefault();
  //   fetch(backendurl+"/categories")
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  // }

  render() {
    return (
      <React.Fragment>   
        <HeaderNav/>   
        <Switch>
          <Route exact path="/" component={LoginRegister} />
          <Route path="/recipes" component={Recipes} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(App));

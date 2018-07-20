import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import '../App.css';
import LoginRegister from './LoginRegister';
import HeaderNav from './HeaderNav';
import Recipes from './Recipes'
import UserRecipes from './UserRecipes';

class App extends Component {

  render() {
    return (
      <React.Fragment>   
        <HeaderNav/>   
        <Switch>
          <Route exact path="/" component={LoginRegister} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/userrecipes" component={UserRecipes} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      token : state.authReducer.token,
      user : state.authReducer
  }
}

export default withRouter(connect(mapStateToProps)(App));

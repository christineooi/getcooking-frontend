import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../App.css';
import { Header } from 'semantic-ui-react';
import RecipeList from "./RecipeList";

class UserRecipes extends Component {
    state = {
        recipes: [],
        mode: 'private'
    }

    getUserRecipes() {
        // const postOptions = {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //       userid: this.props.user.userid 
        //     })
        // };
        // fetch(backendurl+"/userrecipes", postOptions)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     if (data.auth) {
        //         this.props.dispatch(loginUser(data));      
        //     }
        // })
        // .catch(err=> console.log(err))
    }

    componentDidMount() {
        this.getUserRecipes();
    }

    render() {
        return (
            <React.Fragment>
                <Header size="large" textAlign='center' dividing>
                    Your Recipes
                </Header>
                {/* <RecipeList mode={this.state.mode}/> */}
            </React.Fragment>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
      token: state.authReducer.token,
      user: state.authReducer
    }
  }

export default withRouter(connect(mapStateToProps)(UserRecipes));


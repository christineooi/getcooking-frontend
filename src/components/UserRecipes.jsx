import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../App.css';
import { Header , Segment} from 'semantic-ui-react';
import RecipeList from "./RecipeList";
import { backendurl } from '../config';
import { getUserRecipes } from '../actions/recipeActions';

class UserRecipes extends Component {
    state = {
        recipes: [],
        mode: 'private'
    }

    getUserRecipes() {
        const postOptions = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            "Authorization": "Bearer " + this.props.token 
            },
            body: JSON.stringify({
              userid: this.props.user.userid 
            })
        };
        fetch(backendurl+"/getuserrecipes", postOptions)
        .then(response => response.json())
        .then(data => {
            console.log("user recipes: ", data.rows)
            this.props.dispatch(getUserRecipes(data.rows));
            this.setState({ recipes: data.rows });
        })
        .catch(err=> console.log(err))
    }

    componentDidMount() {
        console.log("in componentdidmount");
        this.getUserRecipes();
    }

    render() {
        // console.log("this.state.recipes.length !== 0 : ", this.state.recipes.length !== 0);
        return (
            <React.Fragment>
                <Segment inverted color="olive">
                    <Header as="h2" textAlign='center' dividing>
                        My Recipes
                    </Header>
                </Segment>
                <React.Fragment>
                <RecipeList recipes={this.state.recipes} mode={this.state.mode}/>
                </React.Fragment> 
               
            </React.Fragment>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
      token: state.authReducer.token,
      user: state.authReducer,
      recipes: state.recipeReducer.recipes
    }
  }

export default withRouter(connect(mapStateToProps)(UserRecipes));


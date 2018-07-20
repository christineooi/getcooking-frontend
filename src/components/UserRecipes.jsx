import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../App.css';
import { Header , Segment} from 'semantic-ui-react';
import RecipeList from "./RecipeList";
import { backendurl } from '../config';

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
            this.setState({ recipes: data.rows });
        })
        .catch(err=> console.log(err))
    }

    componentDidMount() {
        console.log("in componentdidmount");
        this.getUserRecipes();
    }

    render() {
        return (
            <React.Fragment>
                <Segment inverted color="olive">
                    <Header as="h2" textAlign='center' dividing>
                        Your Recipes
                    </Header>
                </Segment>
                {/* <RecipeList recipes={this.state.recipes} mode={this.state.mode}/> */}
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


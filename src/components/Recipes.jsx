import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import '../App.css';
import RecipeList from "./RecipeList";
import { f2f_api_key } from '../config2';
import { Form, Input, Button} from "semantic-ui-react"

class Recipes extends Component {
    state = {
        recipes: []
    }

    getRecipe = (e) => {
        const searchKeyword = e.target.elements.keywordSearch.value;
        console.log("searchKeyword: ", searchKeyword);
        e.preventDefault();
        let api_key = null;
        if (process.env.NODE_ENV !== 'production') {
            api_key = f2f_api_key;
        } else {
            api_key = process.env.F2F_API_KEY;
        }
        fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${api_key}&q=${searchKeyword}&sort=r&count=20`)
        .then(response => response.json())
        .then(data => {
            console.log(data.recipes)
            this.setState({ recipes: data.recipes });
        })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.getRecipe}>
                    <Input type="text" id ="searchInput" name="keywordSearch" size="large" placeholder="What do you feel like eating?" focus/>
                    <Button id="searchBtn" color="orange" size="large">Search</Button>
                </Form>
                <RecipeList recipes={this.state.recipes}/>
            </div>
        ) 
    }
}


export default withRouter(connect()(Recipes));


import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Segment, Card, Image, Button } from "semantic-ui-react";
import { backendurl } from "../config";
import { saveRecipe, deleteRecipe } from "../actions/recipeActions";
import '../App.css';

class RecipeList extends Component {


  handleSave = (image, source, title, publisher) => (e) => {
    e.preventDefault();
    const recipeObj = {
      image: image,
      source: source,
      title: title,
      publisher: publisher,
      userid: this.props.user.userid
    }
    fetch(backendurl+"/saverecipe",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.token 
        },
        body: JSON.stringify(recipeObj)
      }
    )
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.status === "success") {
          this.props.dispatch(saveRecipe(recipeObj));
          this.props.history.push("/recipes");
          alert("Recipe Saved")
        }
    })
    .catch(e => {
            console.log(e);
    }); 
    
    
  }

  handleDelete = (id) => (e) => {
    e.preventDefault();
    fetch(backendurl+"/removerecipe/"+id,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.token 
        }
      }
    )
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.status === "success") {
          this.props.dispatch(deleteRecipe(id));
          this.props.history.push("/recipes");
          this.props.history.push("/userrecipes");
        }
    })
    .catch(e => {
            console.log(e);
    }); 
  }

  render() {
    
    return (
      <React.Fragment>
        <Segment>
          <Card.Group className="card_group" centered>
          { this.props.recipes.map((recipe) => {
            return (
              <div key={recipe.title} id="cardDiv">
              <Card className="card">             
                <Image src={recipe.image_url} fluid/>
                <Card.Content>
                  <Card.Header><a href={recipe.source_url} target='_blank'> { recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</a></Card.Header>
                  <Card.Description>{ recipe.publisher }</Card.Description>
                </Card.Content>
                {this.props.token &&
                <Card.Content extra>
                  {this.props.token && (this.props.mode==='public') &&
                  <React.Fragment>
                  <br/>
                  <Button color='teal' onClick={ this.handleSave(recipe.image_url, recipe.source_url, recipe.title, recipe.publisher)} compact>
                    Save Recipe
                  </Button>
                  </React.Fragment>}
                  {this.props.token && (this.props.mode==='private') &&
                  <React.Fragment>
                  <br/>
                  <Button color='teal' onClick={ this.handleDelete(recipe.recipe_id) } compact>
                    Remove Recipe
                  </Button>
                  </React.Fragment>}
                </Card.Content>}              
              </Card> 
              </div>
            );
          })}
          </Card.Group>
        </Segment>
      </React.Fragment>
    );
  }
}
  
const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer
  }
}

export default withRouter(connect(mapStateToProps)(RecipeList));
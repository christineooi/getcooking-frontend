import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Segment, Card, Image, Button } from "semantic-ui-react";
import { backendurl } from "../config";
import { saveRecipe } from "../actions/recipeActions";

class RecipeList extends Component {


  handleSave = (image, source, title, publisher) => (e) => {
    console.log("in handleSave")
    e.preventDefault();
    const recipeObj = {
      image: image,
      source: source,
      title: title,
      publisher: publisher,
      userid: this.props.user.userid
    }
    console.log("recipeObj: ", recipeObj);
    console.log("JSON.stringify(recipeObj): ", JSON.stringify(recipeObj));
    console.log("JSON.stringify({recipeObj}): ", JSON.stringify({recipeObj}));
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
        console.log(data);
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
    console.log("in handleDelete")
    e.preventDefault();
  }

  render() {
    console.log("this.props.user.userid: ", this.props.user.userid);
    
    return (
      <React.Fragment>
        <Segment>
          <Card.Group centered itemsPerRow={6}>
          { this.props.recipes.map((recipe) => {
            return (
              <Card>
                <div key={recipe.recipe_id}>
                <Image src={recipe.image_url} />
                <Card.Content>
                  <Card.Header><a href={recipe.source_url} target='_blank'> { recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</a></Card.Header>
                  <Card.Description>{ recipe.publisher }</Card.Description>
                </Card.Content>
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
                  <Button color='teal' onClick={ this.handleDelete(this.props.user.userid) } compact>
                    Remove Recipe
                  </Button>
                  </React.Fragment>}
                </Card.Content>
                </div>
              </Card>  
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
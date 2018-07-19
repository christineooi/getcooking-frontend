import React, { Component } from "react";
import { connect } from 'react-redux';
import { Segment, Card, Image } from "semantic-ui-react";

class RecipeList extends Component {
  render() {
    // console.log("this.props.recipes: ", this.props.recipes);

    return (
      <React.Fragment>
        <Segment>
          <Card.Group centered itemsPerRow={4}>
          { this.props.recipes.map((recipe) => {
            return (
              <Card>
                <div key={recipe.recipe_id}>
                <Image src={recipe.image_url} />
                <Card.Content>
                  <Card.Header>{ recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }</Card.Header>
                  <Card.Description>{ recipe.publisher }</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a href={ recipe.source_url } target='_blank'>
                    View Recipe
                  </a>
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
  
export default RecipeList;
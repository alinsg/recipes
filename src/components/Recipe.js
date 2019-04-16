import React, { Component } from 'react';

//This component will receive props from RecipeList
//Props consist of a recipe object that contains information
//about that recipe
class Recipe extends Component {
  render() {
    //Here I destructure what I receive from Recipe component's props
    const {
      image_url,
      title,
      source_url,
      publisher,
      recipe_id
    } = this.props.recipe;
    const {handleDetails} = this.props;

    return (
      <React.Fragment>
        <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
          <div className="card">
            <img className="img-card-top" src={image_url} alt="recipe" style={{height: "14rem"}}/>
            <div className="card-body text-capitalize">
              <h6>{title}</h6>
              <h6 className="text-warning text-slanted">provided by {publisher}</h6>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary text-capitalize" type="button" onClick={handleDetails}>details</button>
              <a href={source_url} className="btn btn-success mx-2 text-capitalize" target="blank" rel="noopener noreferrer">recipe url</a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recipe;
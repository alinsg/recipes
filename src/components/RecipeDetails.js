import React, { Component } from 'react';
//Inside the brackets I have recipe because that's the name
//of the exported const from tempDetails
//TempDetails is imported in order to not waste API calls
import {recipe} from '../tempDetails';

class RecipeDetails extends Component {
  //props argument is the one received from App component
  constructor(props) {
    super(props);
    this.state = {
      recipe: recipe,
      url: `https://www.food2fork.com/api/get?key=${process.env.REACT_APP_RECIPES_KEY}&rId=${this.props.id}`
    };
  };

  async componentDidMount() {
    try {
      const data = await fetch(this.state.url); //First get the data (await)
      const jsonData = await data.json(); //Then wait for that data in order to use it
      this.setState({
        //The key below is the second key that I get from the API
        //After that I set the recipes key from state to that value
        recipe: jsonData.recipe
      });
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            {/* This below is the left column from details page */}
            <div className="col-14 mx-auto col-md-6 my-3">
              <button type="button" className="btn btn-warning mb-5 text-capitalize">back to recipe list</button>
              <img src={image_url} className="d-block w-100" alt="recipe" />
            </div>
            {/* This below is the right column from details page*/}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">provided by {publisher}</h6>
              <a href={publisher_url} className="btn btn-primary mt-2 text-capitalize" target="blank" rel="noopener noreferrer">publisher webpage</a>
              <a href={source_url} className="btn btn-success mt-2 mx-3 text-capitalize" target="blank" rel="noopener noreferrer">recipe url</a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-4 text-capitalize">ingredients</h2>
                { ingredients.map((item,index) => {
                  return (
                    <li className="list-group-item text-slanted" key={index}>{item}</li>
                  );
                }) }
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeDetails;
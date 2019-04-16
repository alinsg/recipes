import React, { Component } from 'react';
import './App.css';
//The recipes import below is used as a placeholder for
//the API because food2fork API free plan has only 50
//requests per day
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    //recipes: [], 
    recipes: recipes, //placeholder for App debugging
    url: `https://www.food2fork.com/api/search?key=${process.env.REACT_APP_RECIPES_KEY}`,
    details_id: 35386
  };

  //Async/await allows me to write my code like I would be performing actions
  //synchronously
  async getRecipes() {
  try {
    const data = await fetch(this.state.url); //First get the data (await)
    const jsonData = await data.json(); //Then wait for that data in order to use it
    this.setState({
    //The key below is the second key that I get from the API
    //After that I set the recipes key from state to that value
    recipes: jsonData.recipes
    });
  } catch(error) {
    console.log(error);
  }
}

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    //console.log(this.state.recipes);
    return (
      <React.Fragment>
        <RecipeList recipes={this.state.recipes} />
        <RecipeDetails id={this.state.details_id} />
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: [],
    url: `https://www.food2fork.com/api/search?key=${process.env.REACT_APP_RECIPES_KEY}`
  };

  //Async/await allows me to write my code like I would be performing actions
  //syncrhronously
  async getRecipes() {
    try {
      //First I get the data and then I transfer it to JSON format
      const data = await fetch(this.state.url);    
      const jsonData = await data.json();
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
    console.log("Component is mounted..");
    this.getRecipes();
  }

  render() {
    console.log(this.state.recipes);
    return (
      <React.Fragment>
        <RecipeList />
        <RecipeDetails />
      </React.Fragment>
    );
  }
}

export default App;

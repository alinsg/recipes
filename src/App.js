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
    details_id: 35386,
    pageIndex: 1
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

//  componentDidMount() {
//    this.getRecipes();
//  }

  //Depending of the value of the argument that it gets, the method displayPage
  //will render a component
  displayPage = (index) => {
    switch(index) {
      case 1: return(
        <RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails}/>
      );
      case 0: return(
        <RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex}/>
      );
      default:
    }
  };

  handleIndex = (index) => {
    this.setState({
      pageIndex: index
    });
  };

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* Below is the call to the method that renders the page
            As a parameter, the method has the value of the pageIndex key
            from the state */}
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;

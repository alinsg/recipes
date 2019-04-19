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
    base_url: `https://www.food2fork.com/api/search?key=${process.env.REACT_APP_RECIPES_KEY}`,
    details_id: 35386,
    pageIndex: 1,
    search: "",
    query: "&q=",
    error: ""
  };

  //Async/await allows me to write my code like I would be performing actions
  //synchronously
  async getRecipes() {
    try {
      const data = await fetch(this.state.url); //First get the data (await)
      const jsonData = await data.json(); //Then wait for that data in order to use it
      if(jsonData.recipes.length === 0) {
        this.setState(()=> {
          return {error: "sorry, but your search did not return any results"}
        });
      } else {
        this.setState(() => {
          return {recipes: jsonData.recipes}
        });
      };
    } catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  //Depending of the value of the argument that it gets, the method displayPage
  //will render a component
  displayPage = (index) => {
    switch(index) {
      case 1: return(
        <RecipeList recipes={this.state.recipes} 
                    handleDetails={this.handleDetails}
                    value={this.state.search}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    error={this.state.error}/>
      );
      case 0: return(
        <RecipeDetails id={this.state.details_id} 
                        handleIndex={this.handleIndex}/>
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

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {base_url, query, search} = this.state;
    this.setState(() => {
      return {
        url: `${base_url}${query}${search}`,
        search: ""
      };
    }, () => {
      this.getRecipes();
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

import React, { Component } from 'react';
//Inside the brackets I have recipe because that's the name
//of the exported const from tempDetails
import {recipe} from '../tempDetails';

class RecipeDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Hello from Details</h1>
      </React.Fragment>
    );
  }
}

export default RecipeDetails;
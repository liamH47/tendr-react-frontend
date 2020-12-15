import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'

class AllIngContainer extends Component {

    state = {
        ingredientsApi: []
    }

    addToMyIngs = (userIngObj) => {
        fetch('http://localhost:3000/api/v1/user_ingredients', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
          },
          body: JSON.stringify(userIngObj)
        })
        .then(r => r.json())
        .then(data => console.log(data))
    
      }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/ingredients")
        .then(r => r.json())
        .then(data => this.setState({ ingredientsApi: data}))
    }

    renderIngredients = () => {
        return this.state.ingredientsApi.map(ingObj => <Ingredient addToMyIngs={this.addToMyIngs} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
    }
    

    render() {
        return (
            <Segment basic padded='very' vertical>
                {this.renderIngredients()}
            </Segment>
        );
    }
}

export default AllIngContainer;
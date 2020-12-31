import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'
import { connect } from 'react-redux'
import {getIngredients, getUserIngredients, getCocktails} from '../Redux/actions'
import { Redirect } from 'react-router-dom'

class AllIngContainer extends Component {
 
    componentDidMount() {
            this.props.fetchIngredients()
            this.props.fetchUserIngredients()
            this.props.fetchCocktails()
            console.log("in allIng cdm, currentuser state:", this.props.currentUser)
    }

    renderIngredients = () => {
        if(this.props.userIngApi.length > 0) {
            let ids = this.props.userIngApi.map(obj => obj.ingredient_id)
            let ingredients = this.props.ingredientsApi
            let filtered = ingredients.filter((obj) => !ids.includes(obj.id))
            let sorted = filtered.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
            console.log("in render", this.props.userIngApi);
            return sorted.map(ingObj => <Ingredient currentUser={this.props.currentUser} cocktailCount={this.cocktailCount(ingObj)} ingredient={ingObj} userId={2} key={ingObj.id} id={ingObj.id} />)
        } else {
            let sorted2 = this.props.ingredientsApi.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
            return sorted2.map(ingObj => <Ingredient currentUser={this.props.currentUser} cocktailCount={this.cocktailCount(ingObj)} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
        }
    }

    cocktailCount = (ingredient) => {
        let cocktailMap = this.props.cocktailsApi.map(cocktail => cocktail.cocktail_ingredients)
        let cocktIngs = cocktailMap.map(obj => obj.map(newObj => newObj.name))
        let totalCocktails = cocktIngs.filter(obj => obj.includes(ingredient.name))
        return totalCocktails.length
      }



    render() {
        return (              
            <Segment basic padded='very' vertical>
                <Card.Group centered>
                    {this.renderIngredients()}
                </Card.Group>
            </Segment>
        );
    }
}

    function mdp(dispatch){
        return {
            fetchIngredients: () => dispatch(getIngredients()),
            fetchUserIngredients: () =>dispatch(getUserIngredients()),
            fetchCocktails: () =>dispatch(getCocktails())
        }
    }
    function msp(state){
        return {
            currentUser: state.currentUser,
            ingredientsApi: state.ingredientsApi,
            userIngApi: state.userIngApi,
            cocktailsApi: state.cocktailsApi
        }
    }

export default connect(msp, mdp)(AllIngContainer)
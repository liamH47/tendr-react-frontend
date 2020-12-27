import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'
import { connect } from 'react-redux'
import {getIngredients, getUserIngredients, getCocktails} from '../Redux/actions'

class AllIngContainer extends Component {
 
    componentDidMount() {
        this.props.fetchIngredients()
        this.props.fetchUserIngredients()
        this.props.fetchCocktails()
        // debugger
        // this.getIngredients()
        // console.log(this.state)
    }

    renderIngredients = () => {
        if(this.props.userIngApi.length > 0) {
            let ids = this.props.userIngApi.map(obj => obj.ingredient_id)
            let ingredients = this.props.ingredientsApi
            let filtered = ingredients.filter((obj) => !ids.includes(obj.id))
            let sorted = filtered.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
            console.log("in render", this.props.userIngApi);
            return sorted.map(ingObj => <Ingredient ingredient={ingObj} userId={2} key={ingObj.id} id={ingObj.id} />)
        } else {
            return this.props.ingredientsApi.map(ingObj => <Ingredient ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
        }
    }

    cocktailCount = (ingredient) => {
        let cockMap = this.props.cocktailsApi.map(cock => cock.cocktail_ingredients)
        let plswork = cockMap.map(obj => obj.map(newObj => newObj.name))
        let please = plswork.filter(obj => obj.includes(ingredient.name))
        return please.length
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
            ingredientsApi: state.ingredientsApi,
            userIngApi: state.userIngApi,
            cocktailsApi: state.cocktailsApi
        }
    }

export default connect(msp, mdp)(AllIngContainer)
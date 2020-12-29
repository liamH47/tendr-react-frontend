import React, { Component } from 'react';
import { Segment, Image, Card, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails } from '../Redux/actions'
import Cocktail from '../Components/Cocktail'
import CocktailItem from '../Components/CocktailItem'

class AllCocktails extends Component {

    componentDidMount() {
        this.props.fetchCocktails()
    }

    renderAllCocktails = () => {
        let filtered = this.props.cocktailsApi.filter(el => this.checkCanMake(el, this.props.userIngApi) === false)
        let sorted = filtered.sort((a, b) => this.howManyIngs(a) - this.howManyIngs(b))
        return sorted.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
     }

     howManyIngs = (cocktailObj) => {
        let cocktail = cocktailObj.cocktail_ingredients
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let hasThis = cocktail.filter((ing) => ingNames.includes(ing.name))
        return cocktail.length - hasThis.length
    }
    


     checkCanMake(singleCockt, userIngApi) {
         let cocktail = singleCockt.cocktail_ingredients
         return cocktail.every(function(ing) {
          return userIngApi.some(function(ing2) {
             return (ing.name == ing2.name) && (ing.quantity <= ing2.quantity) 
           })
         })
     }

    // renderAllCocktails = () => {
    //     return this.props.cocktailsApi.map(cocktail => <Cocktail cocktail={cocktail} id={cocktail.id} key={cocktail.id} />)
    // }
    
    render() {
        return (
            <Segment basic padded='very' vertical>
                <h2>All Cocktails</h2>
                <Item.Group divided>
                    {this.renderAllCocktails()}
                </Item.Group>
            </Segment>
        );
    }
}


function mdp(dispatch){
    return{
        fetchUserIngredients: () => dispatch(getUserIngredients()),
        fetchCocktails: () => dispatch(getCocktails())
    }
}

function msp(state){
    return {
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}


export default connect(msp, mdp)(AllCocktails);
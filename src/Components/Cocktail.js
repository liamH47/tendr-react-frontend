import React, { Component } from 'react';
import{Card, Image, List} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients } from '../Redux/actions'

class Cocktail extends Component {

    componentDidMount() {
        console.log("cocktail props", this.props)
        this.props.fetchUserIngs()
        // debugger
    }

    
    
    howManyIngs = (cocktailObj) => {
        let cocktail = cocktailObj.cocktail_ingredients
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let hasThis = cocktail.filter((ing) => ingNames.includes(ing.name))
        let missingIngCount = cocktail.length - hasThis.length
        if(missingIngCount >= 1){
            return `You are missing ${missingIngCount} ingredients `
        } else {
            return 'You have all the Ingredients!'
        }
    }

    renderIngTable = () => {
        let cocktIngs = this.props.cocktail.cocktail_ingredients
        return cocktIngs.map((ingredient, index) => {
            const { name, unit, quantity } = ingredient
            return(
                <List.Item floated='left'>
                    <List.Content floated='left'>
                        {this.ingredientCheck(name)} {quantity} {unit} {name} 
                    </List.Content>
                </List.Item>
            )
        })
    }
    

    render() {
        const {cocktail} = this.props 
        return (
            <Card color='violet'>
                <Image floated='left' size='medium' src={cocktail.image_url} />
                <Card.Content>
                    <Card.Header>{cocktail.name}</Card.Header>
                    <Card.Meta>{this.howManyIngs(this.props.cocktail)} ingredients</Card.Meta>
                    {/* <List ordered verticalAlign='bottom'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List> */}
                    <Card.Description>
                        <List animated verticalAlign='middle'>
                            {this.renderIngTable()}
                        </List>
                    </Card.Description>
                </Card.Content>

            </Card>
        );
    }
}
function mdp(dispatch){
    return{
        fetchCocktails: () => dispatch(getCocktails()),
        fetchUserIngs: () => dispatch(getUserIngredients())
    }
}

function msp(state){
    return {
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}

export default connect(msp, mdp)(Cocktail);
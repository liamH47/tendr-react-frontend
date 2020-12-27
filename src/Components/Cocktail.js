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

    
    
    // renderInstructions = () => {
    //     this.props.cocktail.instructions.map(step => <List.Item >{step}</List.Item>)
    // }
    howManyIngs = (cocktailObj) => {
        let cocktail = cocktailObj.cocktail_ingredients
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let hasThis = cocktail.filter((ing) => ingNames.includes(ing.name))
        return cocktail.length - hasThis.length
    }
    

    render() {
        const {cocktail} = this.props 
        return (
            <Card color='violet'>
                <Image src={cocktail.image_url} />
                <Card.Content>
                    <Card.Header>{cocktail.name}</Card.Header>
                    <List ordered verticalAlign='bottom'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List>
                    <Card.Meta>You are missing {this.howManyIngs(this.props.cocktail)} ingredients</Card.Meta>
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
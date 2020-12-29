import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, List, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients } from '../Redux/actions'

class CocktailItem extends Component {

    componentDidMount() {
        this.props.fetchUserIngs()
        console.log("in cocktail cdm", this.props.cocktail.cocktail_ingredients)
    }
    
    ingredientCheck = (name) => {
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        if(ingNames.includes(name)) {
            return <Icon color='green' size='big' name='check circle' />
        }else{
            return <Icon color='red' size='big' name='exclamation circle' />
        }
    }

    howManyIngs = (cocktailObj) => {
        let cocktail = cocktailObj.cocktail_ingredients
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let hasThis = cocktail.filter((ing) => ingNames.includes(ing.name))
        return cocktail.length - hasThis.length
    }

    renderIngTable = () => {
        let cocktIngs = this.props.cocktail.cocktail_ingredients
        return cocktIngs.map((ingredient, index) => {
            const { name, unit, quantity } = ingredient
            return(
                <Table.Row>
                    <Table.Cell>{quantity}</Table.Cell>
                    <Table.Cell>{unit}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{this.ingredientCheck(name)}</Table.Cell>
                </Table.Row>
            )
        })
    }

    render() {
        const { cocktail } = this.props
        return (
            <Item padded='very'>
                <Item.Image rounded size='medium' floated='left' src={cocktail.image_url} />
                <Item.Content>
                    <Item.Header>{cocktail.name}</Item.Header>
                    <Item.Meta>{cocktail.category}</Item.Meta>
                    <Item.Description>{`You are missing ${this.howManyIngs(this.props.cocktail)} ingredients`}</Item.Description>
                    <List ordered verticalAlign='bottom'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List>
                    <Table>
                        {this.renderIngTable()}
                    </Table>
                </Item.Content>
            </Item>
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

export default connect(msp, mdp)(CocktailItem);



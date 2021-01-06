import React, { Component } from 'react';
import { Button, Icon, Image, Label, List, Card, Modal} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, saveCocktail, getShoppingList } from '../Redux/actions'

class Cocktail extends Component {

    state = {
        clicked: false,
        open: false
      }
    
      toggleHandler = () => {
        this.setState({
          clicked: !this.state.clicked,
        })
      }
    
      toggleModal = () => {
        this.setState({
          open: !this.state.open,
        })
      }

    componentDidMount() {
        this.props.fetchIngredients()
        this.props.fetchUserIngs()
        this.props.fetchShoppingList()
        console.log(this.props.currentUser)
        // debugger
    }


    localSaveHandler = (e) => {
        e.preventDefault()
        this.props.localSaveHandler( this.props.cocktail.id, this.props.currentUser.user.id)
    }

    
    ingredientCheck = (name) => {
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let shoppingNames = this.props.shoppingListApi.map(ing => ing.ingredient.name)
        if(ingNames.includes(name)) {
            return <Icon color='green' size='big' name='check circle' />
        }else if(shoppingNames.includes(name)){
            return <Icon color='blue' size='big' name='shopping cart'/>
        }else{
            return <Icon color='red' size='big' name='exclamation circle' />
        }
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
        const { cocktail } = this.props
        return (
            <Card padded='very'>
                <Card.Image rounded size='medium' floated='left' src={cocktail.image_url} />
                <Card.Content>
                    <Card.Header>{cocktail.name}</Card.Header>
                    <Card.Meta>{cocktail.category}</Card.Meta>
                    <Card.Description>{this.howManyIngs(this.props.cocktail)}</Card.Description>
                    <List ordered verticalAlign='bottom'>
                        {cocktail.instructions.map(element => <List.Card>{element}</List.Card>)}
                    </List>
                    <List verticalAlign='left'>
                        {this.renderIngTable()}

                    </List>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={this.localSaveHandler}>Add to Saved Cocktails</Button>
                </Card.Content>
            </Card>

        );
    }
}
function mdp(dispatch){
    return{
        fetchIngredients: () => dispatch(getIngredients()),
        fetchCocktails: () => dispatch(getCocktails()),
        fetchUserIngs: () => dispatch(getUserIngredients()),
        localListHandler: (ingredient) => dispatch(addToShoppingList(ingredient)),
        localSaveHandler: (cocktailId, userId) => dispatch(saveCocktail(cocktailId, userId)),
        fetchShoppingList: () => dispatch(getShoppingList()) 
    }
}

function msp(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi,
        shoppingListApi: state.shoppingListApi
    }
}

export default connect(msp, mdp)(Cocktail);
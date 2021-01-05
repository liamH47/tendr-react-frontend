import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, List} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, saveCocktail, getShoppingList } from '../Redux/actions'

class CocktailItem extends Component {

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

    // localListHandler = (e) => {
    //     e.preventDefault()
    //     this.props.localListHandler({
    //         ingredient_id: this.props.ingredient.id,
    //         user_id: this.props.currentUser.user.id
    //     })

    // }
    //need to find the id of the ingredient whose name matches 

    clickHandler = () => {
        console.log("click")
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
            // <Label>
            //             <Button onClick={this.clickHandler} size='small'>Add To Shopping List</Button>
            //        </Label>
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
                <List.Item>

                    {quantity} {unit} {name} {this.ingredientCheck(name)}
                </List.Item>
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
                    <Item.Description>{this.howManyIngs(this.props.cocktail)}</Item.Description>
                    <List ordered verticalAlign='bottom'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List>
                    <List verticalAlign='left'>
                        {this.renderIngTable()}

                    </List>
                    <Button onClick={this.localSaveHandler}>Add to Saved Cocktails</Button>
                </Item.Content>
            </Item>
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

export default connect(msp, mdp)(CocktailItem);



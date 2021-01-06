import React, { Component } from 'react';
import { Button, Icon, Item, Label, List, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, addNote, getSavedCocktails, deleteSavedCocktail, getShoppingList } from '../Redux/actions'

class SavedCocktailItem extends Component {

    state = {
        notes: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.props.fetchSavedCocktails()
        this.props.fetchIngredients()
        this.props.fetchUserIngs()
        this.props.fetchShoppingList()
        console.log("saved cocktail render props:", this.props)
    }

    localSaveHandler = (e) => {
        e.preventDefault()
        this.props.localSaveHandler( this.props.savedCocktail.cocktail_id, this.props.currentUser.user.id)
        console.log("hello?")
    }

    localDeleteHandler = () => {
        this.props.localDeleteHandler(this.props.id)
    }

    localNoteHandler = (e) => {
        e.preventDefault()
        let currentNotes = this.props.savedCocktail.notes
        let newNotes = [...currentNotes, this.state.notes]
        const updateObj = {
            id: this.props.id,
            user_id: this.props.savedCocktail.user_id,
            cocktail_id: this.props.savedCocktail.cocktail_id,
            notes: newNotes,
            user: this.props.savedCocktail.user,
            cocktail: this.props.savedCocktail.cocktail
        }
        this.props.addNewNote(updateObj)
        e.target.reset()
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
        // const { savedCocktail } = this.props.savedCocktail
        return (
            <Item padded='very'>
                <Item.Image rounded size='large' floated='left' src={this.props.savedCocktail.cocktail.image_url} />
                <Item.Content floated='left'>
                    <Item.Header className='cocktail-item-header' floated='left'><h1>{this.props.savedCocktail.cocktail.name}</h1></Item.Header>
                    <Item.Meta>{this.props.savedCocktail.cocktail.category}</Item.Meta>
                    <Item.Description>{this.howManyIngs(this.props.savedCocktail.cocktail)}</Item.Description>
                    <List animated verticalAlign='middle'>
                        {/* <List.Header floated='left'>Ingredients</List.Header> */}
                        {this.renderIngTable()}
                    </List>
                    <Item.Description>Glass: {this.props.savedCocktail.cocktail.recommended_glass} </Item.Description>
                    <Item.Description>Ice: {this.props.savedCocktail.cocktail.recommended_ice} </Item.Description>
                    <List ordered floated='left'>
                        <List.Header floated='left'>Instructions</List.Header>
                        {this.props.savedCocktail.cocktail.instructions.map(element => <List.Item floated='left'><List.Content floated='left'>{element}</List.Content></List.Item>)}
                    </List>
                </Item.Content>
                <Item.Content floated='right'>
                    <List verticalAlign='middle' bulleted floated='right'>
                        <List.Header>My Notes</List.Header>
                        {this.props.savedCocktail.notes.map(element => <List.Item floated='left'><List.Content floated='left'>{element}</List.Content></List.Item>)}
                    </List>
                    <Form onSubmit={this.localNoteHandler}>
                        <Form.Field>
                            <label>Notes</label>
                            <input type='text' name='notes' value={this.state.notes} onChange={this.changeHandler} placeholder='your notes' />
                        </Form.Field>
                        <Button type='submit'>Add Note</Button>
                    </Form>
                        
                    <Button verticalAlign='bottom' onClick={this.localDeleteHandler}>Remove From Saved Cocktails</Button>
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
        fetchSavedCocktails: () => dispatch(getSavedCocktails()),
        addNewNote: (updateObj) => dispatch(addNote(updateObj)),
        localDeleteHandler: (id) => dispatch(deleteSavedCocktail(id)),
        localSaveHandler: (ingredient) => dispatch(addToShoppingList(ingredient)),
        fetchShoppingList: () => dispatch(getShoppingList()) 
    }
}

function msp(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi,
        savedCocktails: state.savedCocktails,
        shoppingListApi: state.shoppingListApi
    }
}

export default connect(msp, mdp)(SavedCocktailItem);
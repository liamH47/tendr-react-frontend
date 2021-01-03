import React, { Component } from 'react';
import { Button, Icon, Input, Item, Label, List, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, addNote, getSavedCocktails } from '../Redux/actions'

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
        console.log("in savedcocktail cdm", this.props)
        // debugger
        // debugger
    }
    //patch request that will take an argument of the id and this.state.note id is for url and note is to be patched in


    //find the saved cocktail object
    //update the notes array so that it includes the note held in state
    //pass this new version with updated notes to the add note function, which will patch the previous version with the new one

    localSaveHandler = (e) => {
        e.preventDefault()
        this.props.localSaveHandler( this.props.cocktail.id, this.props.currentUser.user.id)
    }

    localNoteHandler = (e) => {
        e.preventDefault()
        let savedCocktail = this.props.savedCocktail
        let notesArr = savedCocktail.notes 
        let newNotes = [...notesArr, this.state.notes]
        savedCocktail.notes = newNotes
        this.props.addNewNote(savedCocktail)

    }
    
    ingredientCheck = (name) => {
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        if(ingNames.includes(name)) {
            return <Icon color='green' size='big' name='check circle' />
        }else{
            return <Label>
                        <Icon color='red' size='big' name='exclamation circle' />
                        <Button  size='small'>Add To Shopping List</Button>
                   </Label>
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
                    <Item.Description>{`You are missing ${this.howManyIngs(cocktail)} ingredients`}</Item.Description>
                    <List ordered floated='right'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List>
                    <List floated='right'>
                        {this.renderIngTable()}

                    </List>
                    <Form onSubmit={this.localNoteHandler}>
                        <Form.Field>
                            <label>Notes</label>
                            <input type='text' name='notes' value={this.state.notes} onChange={this.changeHandler} placeholder='your notes' />
                        </Form.Field>
                        <Button type='submit'>Add Note</Button>
                    </Form>
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
        addNewNote: (updateObj) => dispatch(addNote(updateObj))
    }
}

function msp(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi,
        savedCocktails: state.savedCocktails
    }
}

export default connect(msp, mdp)(SavedCocktailItem);
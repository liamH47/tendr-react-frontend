import React, { Component } from 'react';
import { Button, Icon, Item, Label, List, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, addNote, getSavedCocktails, deleteSavedCocktail } from '../Redux/actions'

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
        debugger

    }
    //patch request that will take an argument of the id and this.state.note id is for url and note is to be patched in


    //find the saved cocktail object
    //update the notes array so that it includes the note held in state
    //pass this new version with updated notes to the add note function, which will patch the previous version with the new one

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

    }
    
    ingredientCheck = (name) => {
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        if(ingNames.includes(name)) {
            return <Icon color='green' size='big' name='check circle' />
        }else{
            return <Label>
                        <Icon color='red' size='big' name='exclamation circle' />
                        <Button onClick={this.localSaveHandler} size='small'>Add To Shopping List</Button>
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
        // const { cocktail } = this.props
        return (
            <Item padded='very'>
                <Item.Image rounded size='medium' floated='left' src={this.props.savedCocktail.cocktail.image_url} />
                <Item.Content>
                    <Item.Header>{this.props.savedCocktail.cocktail.name}</Item.Header>
                    <Item.Meta>{this.props.savedCocktail.cocktail.category}</Item.Meta>
                    <Item.Description>{`You are missing ${this.howManyIngs(this.props.savedCocktail.cocktail)} ingredients`}</Item.Description>
                    <List ordered floated='right'>
                        {this.props.savedCocktail.cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
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
                    <Button onClick={this.localDeleteHandler}>Remove From Saved Cocktails</Button>
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
        localSaveHandler: (ingredient) => dispatch(addToShoppingList(ingredient))
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
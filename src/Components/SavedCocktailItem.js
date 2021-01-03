import React, { Component } from 'react';
import { Button, Icon, Input, Item, Label, List, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, addNote } from '../Redux/actions'

class SavedCocktailItem extends Component {

    state = {
        note: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.props.fetchIngredients()
        this.props.fetchUserIngs()
        console.log("in savedcocktail cdm", this.props)
        // debugger
    }
    //patch request that will take an argument of the id and this.state.note id is for url and note is to be patched in


    localSaveHandler = (e) => {
        e.preventDefault()
        this.props.localSaveHandler( this.props.cocktail.id, this.props.currentUser.user.id)
    }

    localNoteHandler = (e) => {
        e.preventDefault()
        this.props.addNewNote(this.state.note, this.props.id)
    }

    clickHandler = () => {
        console.log("click")
    }
    
    ingredientCheck = (name) => {
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        if(ingNames.includes(name)) {
            return <Icon color='green' size='big' name='check circle' />
        }else{
            return <Label>
                        <Icon color='red' size='big' name='exclamation circle' />
                        <Button onClick={this.clickHandler} size='small'>Add To Shopping List</Button>
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
                    <Item.Description>{`You are missing ${this.howManyIngs(this.props.cocktail)} ingredients`}</Item.Description>
                    <List ordered floated='right'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List>
                    <List floated='right'>
                        {this.renderIngTable()}

                    </List>
                    <Form onSubmit={this.localNoteHandler}>
                        <Form.Field>
                            <label>Note</label>
                            <input placeholder='your notes' />
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
        addNewNote: (note, id) => dispatch(addNote(note, id))
    }
}

function msp(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}

export default connect(msp, mdp)(SavedCocktailItem);
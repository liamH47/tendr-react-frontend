import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, List, Modal, Segment, Grid, Divider, Card} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails, getUserIngredients, addToShoppingList, getIngredients, saveCocktail, getShoppingList } from '../Redux/actions'

class CocktailItem extends Component {

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
        this.setState({ clicked: false, open: false})
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
                <Card>
                    <Image bordered src ={cocktail.image_url} />
                    <Card.Content>
                        {cocktail.name}
                    </Card.Content>
                    <Card.Content extra>
                        <Button color='blue' onClick={this.localSaveHandler} content='Save Cocktail' />
                        <Modal
                            size='large'
                            closeIcon
                            onClose={() => this.toggleModal()}
                            onOpen={() => this.toggleModal()}
                            open={this.state.open}
                            trigger={
                                <Button
                                content='Learn More'
                                positive
                                onClick={() => {
                                    this.toggleModal();
                                }}
                                />
                            }>
                            <Modal.Header textAlign='center' >
                                <h3>{cocktail.name}</h3>
                            </Modal.Header>
                                <Segment>
                                    <Grid columns={3} stackable>
                                        <Grid.Column width={8} >
                                            <Image src={cocktail.image_url} alt={cocktail.name} size='large' rounded floated='left' />
                                        </Grid.Column>
                                        <Grid.Column className='cocktail-column' width={4}>
                                            <List relaxed verticalAlign='left'>
                                                <List.Item><strong>Category:</strong> {cocktail.category}</List.Item>
                                                <List.Item><strong>Glass:</strong> {cocktail.recommended_glass}</List.Item>
                                                <List.Item><strong>Ice:</strong> {cocktail.recommended_ice}</List.Item>
                                                <List.Item><strong>Garnish:</strong> {cocktail.garnish}</List.Item>
                                            </List>
                                            <List relaxed bulleted floated='left' verticalAlign='bottom'>
                                                <List.Header><strong>Recipe</strong></List.Header>
                                                {cocktail.instructions.map(element => <List.Item floated='left'><List.Content floated='left'>{element}</List.Content></List.Item>)}
                                            </List>
                                            {/* <Label>Category: {cocktail.category}</Label>
                                            <Label>{this.howManyIngs(this.props.cocktail)}</Label> */}
                                        </Grid.Column>
                                        <Grid.Column className='cocktail-column' width={4}>
            
                                            <List animated relaxed='very' verticalAlign='left'>
                                                <List.Header textAlign='center'>{this.howManyIngs(this.props.cocktail)}</List.Header>
                                                {this.renderIngTable()}
                                            </List>
                                            <Button attached='bottom' color='green' onClick={this.localSaveHandler}>Add to Saved Cocktails</Button>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            {/* </Modal.Content> */}
                            
                            {/* <Modal.Actions>
                                <Button color="red" onClick={() => this.toggleModal()}>Exit</Button>
                            </Modal.Actions> */}
                        </Modal>
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

export default connect(msp, mdp)(CocktailItem);



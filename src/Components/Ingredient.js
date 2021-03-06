import React, { Component } from 'react';
import {Card, Image, Button} from 'semantic-ui-react'
import { addIngredient, addToShoppingList } from '../Redux/actions';
import { connect } from 'react-redux'


class Ingredient extends Component {

    // state = {
    //     open: false
    // }

    componentDidMount() {
        console.log("currentuser in ingredient render", this.props.currentUser)
    }
    
    
    localAddHandler = (e) => {
        e.preventDefault()
        this.props.localAddHandler({
            ingredient_id: this.props.ingredient.id,
            user_id: this.props.currentUser.user.id,
            name: this.props.ingredient.name,
            category: this.props.ingredient.category,
            image_url: this.props.ingredient.image_url,
            quantity: this.props.ingredient.quantity,
            unit: this.props.ingredient.unit
        })
    }

    localListHandler = (e) => {
        e.preventDefault()
        this.props.localListHandler({
            ingredient_id: this.props.ingredient.id,
            user_id: this.props.currentUser.user.id
        })

    }

    render() {
        const {ingredient} = this.props
        return (
            <Card>
                <Image bordered src={ingredient.image_url} />
                <Card.Content textAlign='center'>
                    <Card.Header inverted>{ingredient.name}</Card.Header>
                    <Card.Content>In {this.props.cocktailCount} cocktails</Card.Content>
                    <Card.Content>{ingredient.category}</Card.Content>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group>
                        <Button 
                            color='green'
                            
                            content='My Ingredients'
                            onClick={this.localAddHandler}
                            />

                        <Button 
                            color='blue'
                            content='Shopping List'
                            onClick={this.localListHandler}
                            />
                    </Button.Group>
                </Card.Content>
                {/* <Button 
                    attached='bottom'
                    content='plswork'
                    onClick={this.postTest}
                /> */}
            </Card>
        );
    }
}
function mapDispatchToProps(dispatch){
    return {
        localAddHandler: (userIngObj) => dispatch(addIngredient(userIngObj)),
        localListHandler: (ingredient) => dispatch(addToShoppingList(ingredient))
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Ingredient)
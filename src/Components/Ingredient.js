import React, { Component } from 'react';
import {Card, Image, Button, Modal} from 'semantic-ui-react'
import { addIngredient, addToShoppingList } from '../Redux/actions';
import { connect } from 'react-redux'


class Ingredient extends Component {

    state = {
        open: false
    }


    componentDidMount() {
        this.setState({ open: false })
    }
    

    localAddHandler = (e) => {
        e.preventDefault()
        this.props.localAddHandler({
            ingredient_id: this.props.ingredient.id,
            user_id: 1,
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
            user_id: 1
        })

    }

    render() {
        const {ingredient} = this.props
        return (
            <Card>
                <Image src={ingredient.image_url} />
                <Card.Content>
                    <Card.Header inverted>{ingredient.name}</Card.Header>
                    <Card.Content>In {this.props.cocktailCount} cocktails</Card.Content>
                    <Card.Content>{ingredient.category}</Card.Content>
                </Card.Content>
                <Button 
                    attached='bottom'
                    content='Add to My Ingredients'
                    onClick={this.localAddHandler}
                />
                <Button 
                    attached='bottom'
                    content='Add to Shopping List'
                    onClick={this.localListHandler}
                />
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


export default connect(null, mapDispatchToProps)(Ingredient)
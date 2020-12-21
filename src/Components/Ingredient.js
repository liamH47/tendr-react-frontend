import React, { Component } from 'react';
import {Card, Image, Button} from 'semantic-ui-react'
import { addIngredient } from '../Redux/actions';
import { connect } from 'react-redux'
class Ingredient extends Component {

    state = {
        ingredient_id: this.props.id,
        user_id: 2,
        name: this.props.ingredient.name,
        category: this.props.ingredient.category,
        image_url: this.props.ingredient.image_url,
        running_low: false
    };

    localAddHandler = (e) => {
        e.preventDefault()
        this.props.localAddHandler(this.state)
    }

    render() {
        const {ingredient} = this.props
        return (
            <Card>
                <Image src={ingredient.image_url} />
                <Card.Content>
                    <Card.Header>{ingredient.name}</Card.Header>
                    <Card.Content>{ingredient.category}</Card.Content>
                </Card.Content>
                <Button 
                    attached='bottom'
                    content='Add to My Ingredients'
                    onClick={this.localAddHandler}
                />
            </Card>
        );
    }
}
function mapDispatchToProps(dispatch){
    return {localAddHandler: (userIngObj) => dispatch(addIngredient(userIngObj))}
}


export default connect(null, mapDispatchToProps)(Ingredient)
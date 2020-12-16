import React, { Component } from 'react';
import {Card, Image, Button, Form} from 'semantic-ui-react'

class UserIngredient extends Component {

    state = {
        id: this.props.id,
        ingredient_id: this.props.ingredient_id,
        user_id: 2,
        name: this.props.ingredient.name,
        category: this.props.ingredient.category,
        image_url: this.props.ingredient.image_url,
        running_low: false
    }

    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.id)
    }

    localStockCheck = (e) => {
        e.preventDefault()
        if(this.state.running_low === false) {
            this.setState({ running_low: true})
        } else {
            this.setState({ running_low: false})
        }
        this.props.stockCheck(this.state.running_low, this.props.id )

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
                    content='remove from ingredients'
                    onClick={this.localDeleteHandler}
                />

                    <Button
                        // type='submit' 
                        attached='bottom'
                        content='Running Low?'
                        onClick={this.localStockCheck}
                    />
            </Card>
        );
    }
}

export default UserIngredient; 
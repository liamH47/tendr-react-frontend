import React, { Component } from 'react';
import {Card, Image, Button, Form} from 'semantic-ui-react'

class UserIngredient extends Component {

    state = {
        running_low: false
    }

    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.id)
    }

    displayStock = () => {
        if(this.state.running_low === false) {
            return "No"
        }else {
            return "Yes"
        }
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
                    <Card.Content>Running Low: {this.displayStock()} </Card.Content>
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
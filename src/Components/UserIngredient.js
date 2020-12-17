import React, { Component } from 'react';
import {Card, Image, Button} from 'semantic-ui-react'

class UserIngredient extends Component {

    state = {
        running_low: this.props.ingredient.running_low
    }
    

    
    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.id)
    }

    componentDidMount() {
        console.log("before cdm", this.state)
        this.setState({ running_low: this.props.ingredient.running_low})
        console.log("after cdm", this.state)
    }


    
    
    handleRunLow = () => {
        fetch(`http://localhost:3000/api/v1/user_ingredients/${this.props.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({...this.props.ingredient, running_low: !this.state.running_low})
        })
        .then(r => r.json())
        .then(ingredient => {this.setState({ running_low: ingredient.running_low})})
        .catch(console.log)
        
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
                        onClick={this.handleRunLow}
                    />
            </Card>
        );
    }
}

export default UserIngredient; 
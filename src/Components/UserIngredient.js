import React, { Component } from 'react';
import {Card, Image, Button} from 'semantic-ui-react'

class UserIngredient extends Component {

    state = {
        running_low: this.props.ingredient.running_low
    }
    
    boolToggle = () => {
        console.log("clicking")
        this.setState({ running_low: !this.state.running_low })
        this.props.stockCheck(this.state.running_low, this.props.id)
    }
    
    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.id)
    }
    // componentDidMount() {
    //     // this.setState({ running_low: this.props.ingredient.running_low })
    //     debugger
    // }
    


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
                        onClick={this.boolToggle}
                    />
            </Card>
        );
    }
}

export default UserIngredient; 
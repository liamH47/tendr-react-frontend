import React, { Component } from 'react';
import {Card, Image, Button} from 'semantic-ui-react'

class UserIngredient extends Component {

    // state = {
    //     ingredient_id: this.props.id,
    //     user_id: this.props.user_id,
    //     name: this.props.ingredient.name,
    //     category: this.props.ingredient.category,
    //     image_url: this.props.ingredient.image_url,
    //     running_low: 
    // }

    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.id)
    }

    // runningLowHandler = (e) => {
    //     e.preventDefault()
    //     if(this.state.running_low === false) {
    //         this.setState({ running_low: true })
    //     }else {
    //         this.setState({ running_low: false })
    //     }
    //     this.props.runningLow(this.state.running_low, this.props.id)
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
                    attached='bottom'
                    content='Running Low?'
                    // onClick={this.runningLowHandler}
                    />
            </Card>
        );
    }
}

export default UserIngredient;
{/* <Card.Content>Running Low: {this.state.running_low}</Card.Content> */}

//maybe copy beyonce lab and make a running low container?
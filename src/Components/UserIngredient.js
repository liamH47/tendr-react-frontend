import React, { Component } from 'react';
import {Card, Image, Button} from 'semantic-ui-react'

class UserIngredient extends Component {

    localDeleteHandler = () => {
        this.props.deleteHandler(this.props.id)
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
            </Card>
        );
    }
}

export default UserIngredient; 
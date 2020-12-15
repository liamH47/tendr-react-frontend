import React, { Component } from 'react';
import {Card, Image} from 'semantic-ui-react'

class Ingredient extends Component {
    render() {
        const {ingredient} = this.props
        return (
            <Card>
                <Image src={ingredient.image_url} />
                <Card.Content>
                    <Card.Header>{ingredient.name}</Card.Header>
                    <Card.Content>{ingredient.category}</Card.Content>
                </Card.Content>
            </Card>
            // <div>
            //     <img src={ingredient.image_url} />
            // </div>
        );
    }
}

export default Ingredient;
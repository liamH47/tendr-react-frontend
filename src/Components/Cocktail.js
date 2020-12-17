import React, { Component } from 'react';
import{Card, Image} from 'semantic-ui-react'

class Cocktail extends Component {
    render() {
        const {cocktail} = this.props 
        return (
            <Card>
                <Image src={cocktail.image_url} />
                <Card.Content>
                    <Card.Header>{cocktail.name}</Card.Header>
                </Card.Content>

            </Card>
        );
    }
}

export default Cocktail;
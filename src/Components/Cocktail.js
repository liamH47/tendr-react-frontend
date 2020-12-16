import React, { Component } from 'react';
import{Card, Image} from 'semantic-ui-react'

class Cocktail extends Component {
    render() {
        const {cocktail} = this.props 
        return (
            <Card>
                <Image src={cocktail.image_url} /> 
            </Card>
        );
    }
}

export default Cocktail;
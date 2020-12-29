import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'

class ShoppingListItem extends Component {

    componentDidMount() {
        console.log(this.props)
    }
    

    render() {
        const {listItem} = this.props
        return (
            <Card>
                <Image src={listItem.image_url} />
                <Card.Header>pls</Card.Header>

            </Card>
        );
    }
}

export default ShoppingListItem;
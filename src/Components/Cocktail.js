import React, { Component } from 'react';
import{Card, Image, List} from 'semantic-ui-react'

class Cocktail extends Component {

    componentDidMount() {
        console.log("cocktail props", this.props)
        // debugger
    }

    // renderInstructions = () => {
    //     this.props.cocktail.instructions.map(step => <List.Item >{step}</List.Item>)
    // }
    

    render() {
        const {cocktail} = this.props 
        return (
            <Card>
                <Image src={cocktail.image_url} />
                <Card.Content>
                    <Card.Header>{cocktail.name}</Card.Header>
                    <List ordered verticalAlign='bottom'>
                        {cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
                    </List>
                </Card.Content>

            </Card>
        );
    }
}

export default Cocktail;
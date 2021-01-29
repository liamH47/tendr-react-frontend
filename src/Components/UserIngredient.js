import React, { Component } from 'react';
import {Card, Image, Button, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteIngredient } from '../Redux/actions'

class UserIngredient extends Component {

    localDeleteHandler = () => {
        this.props.localDeleteHandler(this.props.id)
    }

    render() {
        const {ingredient} = this.props
        return (
            <Card>
                <Image src={ingredient.image_url} />
                <Card.Content>
                    <Card.Header>{ingredient.name}</Card.Header>
                    <Card.Description>In {this.props.cocktailCount} cocktails</Card.Description>
                    {/* <Card.Content>Stock: {this.showStock()}</Card.Content> */}
                </Card.Content>
                <Card.Content extra>

                <Button 
                    negative
                    content='remove from ingredients'
                    onClick={this.localDeleteHandler}
                    />
                    </Card.Content>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {localDeleteHandler: (id) => dispatch(deleteIngredient(id))}
}

function mapStateToProps(state){
    return {userIngApi: state.userIngApi}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIngredient); 
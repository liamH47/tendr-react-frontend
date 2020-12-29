import React, { Component } from 'react';
import { getShoppingList } from '../Redux/actions'
import { connect } from 'react-redux'
import {Segment, Container, Card} from 'semantic-ui-react'
import ShoppingListItem from '../Components/ShoppingListItem'


class ShoppingListCont extends Component {

    componentDidMount() {
        this.props.fetchShoppingList()
        console.log(this.props.shoppingListApi)
    }
    
    renderShoppingList = () => {
        return this.props.shoppingListApi.map(listItem => <ShoppingListItem key={listItem.id} id={listItem.id} listItem={listItem.ingredient} />)
    }

    render() {
        return (
            <Container>
                <Segment  basic padded='very' vertical>
                    <Card.Group centered>
                        {this.renderShoppingList()}
                    </Card.Group>
                </Segment>
            </Container>
        );
    }
}

function mdp(dispatch){
    return {
        fetchShoppingList: () => dispatch(getShoppingList())
    }
}
function msp(state){
    return {
        shoppingListApi: state.shoppingListApi
    }
}

export default connect(msp, mdp)(ShoppingListCont);
import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteListItem } from '../Redux/actions';


class ShoppingListItem extends Component {

    componentDidMount() {
        console.log(this.props)
    }
    
    deleteItem = () => {
        this.props.localDeleteHandler(this.props.id)
    }

    render() {
        const {listItem} = this.props
        return (
            <Card>
                <Image src={listItem.image_url} />
                <Card.Header>pls</Card.Header>
                <Button 
                    attached='bottom'
                    content='remove from shopping list'
                    onClick={this.deleteItem}
                />
            </Card>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {localDeleteHandler: (id) => dispatch(deleteListItem(id))}
}

function mapStateToProps(state){
    return {shoppingListApi: state.shoppingListApi}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItem);
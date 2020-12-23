import React, { Component } from 'react';
import {Card, Image, Button, Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteIngredient } from '../Redux/actions'

class UserIngredient extends Component {

    // state = {
    //     running_low: this.props.ingredient.running_low
    // }
    
    localDeleteHandler = () => {
        this.props.localDeleteHandler(this.props.id)
    }

    // componentDidMount() {
    //     this.setState({ running_low: this.props.ingredient.running_low})
    // }

    // checkRunLow = () => {
    //     if(this.state.running_low) {
    //         return "Mark fully stocked"
    //     } else {
    //         return "Running Low?"
    //     }
    // }

    // showStock = () => {
    //     if(this.state.running_low) {
    //         return <Icon color='red' size='big' name='exclamation circle' />
    //     } else {
    //         return <Icon color='green' size='big' name='check circle' />
    //     }
    // }
    
    // handleRunLow = () => {
    //     fetch(`http://localhost:3000/api/v1/user_ingredients/${this.props.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accepts": "application/json"
    //         },
    //         body: JSON.stringify({...this.props.ingredient, running_low: !this.state.running_low})
    //     })
    //     .then(r => r.json())
    //     .then(ingredient => {this.setState({ running_low: ingredient.running_low})})
    //     .catch(console.log)
        
    // }

    render() {
        const {ingredient} = this.props
        return (
            <Card>
                <Image src={ingredient.image_url} />
                <Card.Content>
                    <Card.Header>{ingredient.name}</Card.Header>
                    <Card.Content>{ingredient.category}</Card.Content>
                    {/* <Card.Content>Stock: {this.showStock()}</Card.Content> */}
                </Card.Content>
                <Button 
                    attached='bottom'
                    content='remove from ingredients'
                    onClick={this.localDeleteHandler}
                />

                    {/* <Button attached='bottom' onClick={this.handleRunLow}>
                        {this.checkRunLow()}
                    </Button> */}
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
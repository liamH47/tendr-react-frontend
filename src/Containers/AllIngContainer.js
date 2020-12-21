import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'
import { connect } from 'react-redux'
import {getIngredients, addIngredient} from '../Redux/actions'

class AllIngContainer extends Component {

    state = {
        ingredientsApi: [],
    }

    // addToMyIngs = (userIngObj) => {
    //     fetch('http://localhost:3000/api/v1/user_ingredients', {
    //       method: 'POST',
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Accepts": "application/json"
    //       },
    //       body: JSON.stringify(userIngObj)
    //     })
    
    // }
 
    componentDidMount() {
        this.props.fetchIngredients()
        // this.getIngredients()
        // console.log(this.state)
    }

    renderIngredients = () => {
        return this.props.ingredientsApi.map(ingObj => <Ingredient addToMyIngs={this.addToMyIngs} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
    }

    //perhaps change it so that only ingredients that aren't in the user's inventory already
    //are rendered


    render() {
        return (
            <Segment basic padded='very' vertical>
                {this.renderIngredients()}
            </Segment>
        );
    }
}

    function mdp(dispatch){
        return {
            fetchIngredients: () => dispatch(getIngredients()),

        }
    }
    function msp(state){
        return {ingredientsApi: state.ingredientsApi}
    }

export default connect(msp, mdp)(AllIngContainer)
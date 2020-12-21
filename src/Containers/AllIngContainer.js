import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'
import { connect } from 'react-redux'
import {getIngredients, getUserIngredients} from '../Redux/actions'

class AllIngContainer extends Component {
 
    componentDidMount() {
        this.props.fetchIngredients()
        this.props.fetchUserIngredients()
        // this.getIngredients()
        // console.log(this.state)
    }

    renderIngredients = () => {
        let ids = this.props.userIngApi.map(obj => obj.ingredient_id)
        let ingredients = this.props.ingredientsApi
        let filtered = ingredients.filter((obj) => !ids.includes(obj.id))

        console.log("in render", this.props.userIngApi);
        return filtered.map(ingObj => <Ingredient addToMyIngs={this.addToMyIngs} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
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
            fetchUserIngredients: () =>dispatch(getUserIngredients())
        }
    }
    function msp(state){
        return {
            ingredientsApi: state.ingredientsApi,
            userIngApi: state.userIngApi
        }
    }

export default connect(msp, mdp)(AllIngContainer)
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'
import { connect } from 'react-redux'
import {getIngredients} from'../Redux/actions'

class AllIngContainer extends Component {

    state = {
        ingredientsApi: [],
    }

    addToMyIngs = (userIngObj) => {
        fetch('http://localhost:3000/api/v1/user_ingredients', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
          },
          body: JSON.stringify(userIngObj)
        })
        // .then(r => r.json())
        // .then(data => console.log(data))
    
    }

    // getIngredients = () => {
    //     fetch("http://localhost:3000/api/v1/ingredients")
    //     .then(r => r.json())
    //     .then(data => this.setState({ ingredientsApi: data}))

    // }
 
    componentDidMount() {
        this.props.fetchIngredients()
        // this.getIngredients()
        // console.log(this.state)
    }

    renderIngredients = () => {
        return this.props.ingredientsApi.map(ingObj => <Ingredient addToMyIngs={this.addToMyIngs} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
    }


    render() {
        return (
            <Segment basic padded='very' vertical>
                {this.renderIngredients()}
            </Segment>
        );
    }
}

    function mdp(dispatch){
        return {fetchIngredients: () => dispatch(getIngredients())}
    }
    function msp(state){
        return {ingredientsApi: state.ingredientsApi}
    }

export default connect(msp, mdp)(AllIngContainer)
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Segment, Container, Card} from 'semantic-ui-react'
import UserIngredient from '../Components/UserIngredient';
import { connect } from 'react-redux'
import {getUserIngredients, getCocktails} from '../Redux/actions'

class MyIngrContainer extends Component {

      componentDidMount() {
        this.props.fetchUserIngredients()
        this.props.fetchCocktails()
      }
        
        renderMyIngredients = () => {
            let sorted = this.props.userIngApi.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
            return sorted.map(ingObj => <UserIngredient cocktailCount={this.cocktailCount(ingObj)} key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.name} image_url={ingObj.image_url} />)
        }

        cocktailCount = (ingredient) => {
            let cocktailMap = this.props.cocktailsApi.map(cock => cock.cocktail_ingredients)
            let cocktIngs = cocktailMap.map(obj => obj.map(newObj => newObj.name))
            let totalCocktails = cocktIngs.filter(obj => obj.includes(ingredient.name))
            return totalCocktails.length
          }
        
        render() {
            return (
                <Container>
                    <Segment basic padded='very' vertical>
                        <h2>Current Ingredients</h2>
                        <Card.Group centered>
                        {this.renderMyIngredients()}
                        </Card.Group>
                    </Segment>
                </Container>
            );
        }
}

function mdp(dispatch){
    return {
        fetchUserIngredients: () => dispatch(getUserIngredients()),
        fetchCocktails: () => dispatch(getCocktails())
    }
}
function msp(state){
    return {
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}

export default connect(msp, mdp)(MyIngrContainer)

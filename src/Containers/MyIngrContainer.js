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
        // debugger
      }
        
        renderMyIngredients = () => {
            let filtered = this.props.userIngApi.filter(ingredient => ingredient.user_id === this.props.currentUser.user.id)
            let sorted = filtered.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
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
                <> {this.props.userIngApi.length ?                 
                <Container>
                    <Segment textAlign='center' basic padded='very' vertical>
                        <h2>Current Ingredients</h2>
                        <Card.Group centered>
                        {this.renderMyIngredients()}
                        </Card.Group>
                    </Segment>
                </Container>
                    : <h2>loading</h2>
                    }
                </>
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
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}

export default connect(msp, mdp)(MyIngrContainer)


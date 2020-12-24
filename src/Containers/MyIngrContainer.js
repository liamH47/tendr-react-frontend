import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Segment, Container, Card} from 'semantic-ui-react'
import Cocktail from '../Components/Cocktail';
import UserIngredient from '../Components/UserIngredient';
import { connect } from 'react-redux'
import {getUserIngredients, getCocktails} from '../Redux/actions'

class MyIngrContainer extends Component {


    // state = {
    //     userIngApi: [],
    //     userCocktails: []
    //   }

      componentDidMount() {
        this.props.fetchUserIngredients()
        this.props.fetchCocktails()
      }
        
        renderCocktails = () => {
           let filtered = this.props.cocktailsApi.filter(el => this.checkCanMake(el, this.props.userIngApi) === true)
           return filtered.map(tailObj => <Cocktail cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
        }

        checkCanMake(singleCockt, userIngApi) {
            let cocktail = singleCockt.cocktail_ingredients
            return cocktail.every(function(ing) {
             return userIngApi.some(function(ing2) {
               console.log(ing.name, ing2.name)
               console.log(ing.quantity, ing2.quantity)
                return (ing.name == ing2.name) && (ing.quantity <= ing2.quantity) 
              })
            })
        }


        renderMyIngredients = () => {
            // if(this.props.userIngApi.length > 0){
                return this.props.userIngApi.map(ingObj => <UserIngredient key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.name} image_url={ingObj.image_url} />)
            // } else {
            //     return "time to go shopping"
            // }
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
                {/* <Segment basic padded='very' vertical>
                    <h2>Possible Drinks</h2>
                    {this.renderCocktails()}

                </Segment> */}
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

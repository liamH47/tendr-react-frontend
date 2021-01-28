import React, { Component } from 'react';
import {Segment, Container, Card} from 'semantic-ui-react'
import CocktailItem from '../Components/CocktailItem';
// import UserIngredient from '../Components/UserIngredient';
import { connect } from 'react-redux'
import {getUserIngredients, getCocktails} from '../Redux/actions'
import { checkCanMake } from '../Helpers/checkCanMake'

class MyCocktailsCont extends Component {

    componentDidMount() {
        this.props.fetchUserIngredients()
        this.props.fetchCocktails()
    }
    
    renderCocktails = () => {
        let filtered = this.props.cocktailsApi.filter(el => checkCanMake(el, this.props.userIngApi) === true)
        return filtered.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)     }

    //  checkCanMake(singleCockt, userIngApi) {
    //      let cocktail = singleCockt.cocktail_ingredients
    //      return cocktail.every(function(ing) {
    //       return userIngApi.some(function(ing2) {
    //         console.log(ing.name, ing2.name)
    //         console.log(ing.quantity, ing2.quantity)
    //          return (ing.name == ing2.name) && (ing.quantity <= ing2.quantity) 
    //        })
    //      })
    //  }


    render() {
        return (
            <> {this.props.cocktailsApi.length ? 
                <Segment textAlign='center' basic padded='very' vertical>
                    <h2>Possible Drinks</h2>
                    <Card.Group centered>
                        {this.renderCocktails()}
                    </Card.Group>
                </Segment>
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

export default connect(msp, mdp)(MyCocktailsCont)
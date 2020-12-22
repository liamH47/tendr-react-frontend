import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Segment, Container} from 'semantic-ui-react'
import Cocktail from '../Components/Cocktail';
import UserIngredient from '../Components/UserIngredient';
import { connect } from 'react-redux'
import {getUserIngredients, getCocktails} from '../Redux/actions'

class MyIngrContainer extends Component {


    state = {
        userIngApi: [],
        userCocktails: []
      }

      componentDidMount() {
        this.props.fetchUserIngredients()
        this.props.fetchCocktails()
      }
        
        renderCocktails = () => {
            if(this.props.userIngApi.length > 0) {
                let ids = this.props.userIngApi.map(obj => obj.ingredient_id)
                console.log(ids)
                let cocktails = this.props.cocktailsApi
                let filtered = cocktails.filter((cocktail) => ids.includes(cocktail.ingredients[0].id))
                return filtered.map(tailObj => <Cocktail cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)

            }
        }



        renderMyIngredients = () => {
            if(this.props.userIngApi.length > 0){
                return this.props.userIngApi.map(ingObj => <UserIngredient deleteHandler={this.deleteHandler} key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.name} image_url={ingObj.image_url} />)
            } else {
                return "time to go shopping"
            }
        }
        
        render() {
            return (
                <Container>
                <Segment basic padded='very' vertical>
                    <h2>Current Ingredients</h2>
                    {this.renderMyIngredients()}
                </Segment>
                <Segment basic padded='very' vertical>
                    <h2>Possible Drinks</h2>
                    {this.renderCocktails()}

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


  //maybe put whole userIngredient in state and pass that as first argument, similar to in post request

//   {
//     let newArr = [...this.state.userIngApi]
//     this.setState({ userIngApi: newArr})
// })
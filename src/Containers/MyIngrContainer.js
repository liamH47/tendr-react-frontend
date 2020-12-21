import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Segment, Container} from 'semantic-ui-react'
import Cocktail from '../Components/Cocktail';
import UserIngredient from '../Components/UserIngredient';
import { connect } from 'react-redux'
import {getUserIngredients} from '../Redux/actions'

class MyIngrContainer extends Component {


    state = {
        userIngApi: [],
        userCocktails: []
      }

      componentDidMount() {
        // this.getUserIngs()
        this.props.fetchUserIngredients()
        // this.setState({ userIngApi: this.props.userIngApi})
        this.getCocktails()
        // console.log(this.state)
      }

    //   getUserIngs = () => {
    //     fetch('http://localhost:3000/api/v1/user_ingredients')
    //     .then(r => r.json())
    //     .then(data => this.setState({ userIngApi: data}))
    //   }

      getCocktails = () => {
          fetch('http://localhost:3000/api/v1/cocktails')
          .then(r => r.json())
          .then(data => this.setState({ userCocktails: data}))
      }
      
      deleteHandler = (id) => {
        //   const currentIngredients = this.props.userIngApi
        //   this.setState({ userIngApi: currentIngredients.filter(userIng => userIng.id !== id)})
          fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
              method: 'DELETE',
            })

        this.props.fetchUserIngredients()
        }

        
        renderCocktails = () => {
            let ids = this.props.userIngApi.map(obj => obj.ingredient_id)
            console.log(ids)
            let cocktails = this.state.userCocktails
            let filtered = cocktails.filter((cocktail) => ids.includes(cocktail.ingredients[0].id))
            return filtered.map(tailObj => <Cocktail cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
        }
        // let filteredArr = cocktails.filter(cocktail => cocktail.)



        renderMyIngredients = () => {
            // let ingredientsArr = this.state.userIngApi
            return this.props.userIngApi.map(ingObj => <UserIngredient deleteHandler={this.deleteHandler} key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.name} image_url={ingObj.image_url} />)
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
    return {fetchUserIngredients: () => dispatch(getUserIngredients())}
}
function msp(state){
    return {userIngApi: state.userIngApi}
}

export default connect(msp, mdp)(MyIngrContainer)


  //maybe put whole userIngredient in state and pass that as first argument, similar to in post request

//   {
//     let newArr = [...this.state.userIngApi]
//     this.setState({ userIngApi: newArr})
// })
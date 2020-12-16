import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react'
import Cocktail from '../Components/Cocktail';
import UserIngredient from '../Components/UserIngredient';

class MyIngrContainer extends Component {


    state = {
        userIngApi: [],
        userCocktails: []
      }

      componentDidMount() {
        this.getUserIngs()
        this.getCocktails()
      }

      getUserIngs = () => {
        fetch('http://localhost:3000/api/v1/user_ingredients')
        .then(r => r.json())
        .then(data => this.setState({ userIngApi: data}))
      }

      getCocktails = () => {
          fetch('http://localhost:3000/api/v1/cocktails')
          .then(r => r.json())
          .then(data => this.setState({ userCocktails: data}))
      }
      
      deleteHandler = (id) => {
          const currentIngredients = this.state.userIngApi
          this.setState({ userIngApi: currentIngredients.filter(userIng => userIng.id !== id)})
          fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
              method: 'DELETE',
            })
            .then(r => r.json())
            .then(data => {
                let newArr = [...this.state.userIngApi]
                this.setState({ userIngApi: newArr})
            })
            .catch(console.log(this.state.userCocktails))
        }

        stockCheck = (running_low, id) => {
            console.log(running_low, id)
            fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify({ running_low })
            })
            .then(r => r.json())
            .then(newIng => {
                let copiedArray = [...this.state.userIngApi]
                let oldIng = copiedArray.find(ing => ing.id === newIng.id)
                let dex = copiedArray.indexOf(oldIng)
                copiedArray[dex] = newIng
                this.setState({ userIngApi: copiedArray })
            })
            .catch(console.log)
        };
        
        renderCocktails = () => {
            let cocktailArr = this.state.userCocktails
            return cocktailArr.map(tailObj => <Cocktail cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
        }
        
        renderMyIngredients = () => {
            let ingredientsArr = this.state.userIngApi
            return ingredientsArr.map(ingObj => <UserIngredient stockCheck={this.stockCheck} deleteHandler={this.deleteHandler} key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.name} image_url={ingObj.image_url} />)
        }
        
        render() {
            return (
                <Container>
                <Segment basic padded='very' vertical>
                    <h2>Current Ingredients</h2>
                    {this.renderMyIngredients()}
                </Segment>
                <Segment basic padded='very' vertical>

                </Segment>
                    <h2>Possible Drinks</h2>
                    {this.renderCocktails()}
                </Container>
            );
        }
}

export default MyIngrContainer


  //maybe put whole userIngredient in state and pass that as first argument, similar to in post request
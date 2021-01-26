import React, { Component } from 'react';
import { Segment, Card, Container } from 'semantic-ui-react'
import Ingredient from '../Components/Ingredient'
import { connect } from 'react-redux'
import {getIngredients, getUserIngredients, getCocktails} from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import IngredientSearch from '../Components/IngredientSearch'
import Loading from '../Components/Loading'
import FilterIngredients from '../Components/FilterIngredients'

class AllIngContainer extends Component {

    state =  {
        searchValue: "",
        currentCat: "All"
    }

    changeHandler = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    categoryHandler = (e) => {
        this.setState({currentCat: e.target.value})
    }
 
    componentDidMount() {
            this.props.fetchIngredients()
            this.props.fetchUserIngredients()
            this.props.fetchCocktails()
            // debugger
    }

    renderIngredients = () => {
        if(this.props.userIngApi.length > 0) {
            let ids = this.props.userIngApi.map(obj => obj.ingredient_id)
            let ingredients = this.props.ingredientsApi
            let filtered = ingredients.filter((obj) => !ids.includes(obj.id))
            let sorted = filtered.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
            let searchArray = sorted.filter(ingredient => ingredient.name.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase()));
            if(this.state.currentCat === "All"){

                return searchArray.map(ingObj => <Ingredient currentUser={this.props.currentUser} cocktailCount={this.cocktailCount(ingObj)} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
            }else{
                let catFilter = searchArray.filter(ingredient => ingredient.category.includes(this.state.currentCat))
                return catFilter.map(ingObj => <Ingredient currentUser={this.props.currentUser} cocktailCount={this.cocktailCount(ingObj)} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
            }
        } else {
            let sorted2 = this.props.ingredientsApi.sort((a, b) => this.cocktailCount(b) -this.cocktailCount(a))
            let searchArray2 = sorted2.filter(ingredient => ingredient.name.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase()));
            if(this.state.currentCat === "All"){
                return searchArray2.map(ingObj => <Ingredient currentUser={this.props.currentUser} cocktailCount={this.cocktailCount(ingObj)} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
            }else{
                let filtered2 = searchArray2.filter(ingredient => ingredient.category.includes(this.state.currentCat))
                return filtered2.map(ingObj => <Ingredient currentUser={this.props.currentUser} cocktailCount={this.cocktailCount(ingObj)} ingredient={ingObj} key={ingObj.id} id={ingObj.id} />)
            }
        }
    }

    cocktailCount = (ingredient) => {
        let cocktailMap = this.props.cocktailsApi.map(cocktail => cocktail.cocktail_ingredients)
        let cocktIngs = cocktailMap.map(obj => obj.map(newObj => newObj.name))
        let totalCocktails = cocktIngs.filter(obj => obj.includes(ingredient.name))
        return totalCocktails.length
      }

    render() {
        return (
            <> {this.props.ingredientsApi.length ? 
            <Container>
                <Segment textAlign='center' basic padded='very' vertical>
                    <h2>Ingredients</h2>
                    <FilterIngredients categoryHandler={this.categoryHandler} changeHandler={this.changeHandler} searchValue={this.state.searchValue} />
                </Segment>
                <Segment basic padded='very' vertical>
                    <Card.Group className='card-group' centered>
                        {this.renderIngredients()}
                    </Card.Group>
                </Segment>
            </Container> : <Loading />}
            </>
        );
    }
}

    function mdp(dispatch){
        return {
            fetchIngredients: () => dispatch(getIngredients()),
            fetchUserIngredients: () =>dispatch(getUserIngredients()),
            fetchCocktails: () =>dispatch(getCocktails())
        }
    }
    function msp(state){
        return {
            currentUser: state.currentUser,
            ingredientsApi: state.ingredientsApi,
            userIngApi: state.userIngApi,
            cocktailsApi: state.cocktailsApi
        }
    }

export default connect(msp, mdp)(AllIngContainer)
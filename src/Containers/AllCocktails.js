import React, { Component } from 'react';
import { Segment, Image, Card, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails} from '../Redux/actions'
import Cocktail from '../Components/Cocktail'
import CocktailItem from '../Components/CocktailItem'
import CocktailSearch from '../Components/CocktailSearch'

class AllCocktails extends Component {

    state =  {
        searchValue: "",
        // categories: []
    }

    changeHandler = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    componentDidMount() {
        this.props.fetchCocktails()
        // console.log(this.props.currentUser)
        // debugger
    }

    renderAllCocktails = () => {
        let filtered = this.props.cocktailsApi.filter(el => this.checkCanMake(el, this.props.userIngApi) === false)
        let sorted = filtered.sort((a, b) => this.howManyIngs(a) - this.howManyIngs(b))
        let searchArray = sorted.filter(cocktail => cocktail.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
        return searchArray.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
     }

    //  let searchArray2 = sorted2.filter(ingredient => ingredient.name.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase()));

     howManyIngs = (cocktailObj) => {
        let cocktail = cocktailObj.cocktail_ingredients
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let hasThis = cocktail.filter((ing) => ingNames.includes(ing.name))
        return cocktail.length - hasThis.length
    }
    


     checkCanMake(singleCockt, userIngApi) {
         let cocktail = singleCockt.cocktail_ingredients
         return cocktail.every(function(ing) {
          return userIngApi.some(function(ing2) {
             return (ing.name == ing2.name) && (ing.quantity <= ing2.quantity) 
           })
         })
     }

    // renderAllCocktails = () => {
    //     return this.props.cocktailsApi.map(cocktail => <Cocktail cocktail={cocktail} id={cocktail.id} key={cocktail.id} />)
    // }
    
    render() {
        return (
            <> {this.props.cocktailsApi.length ? 
                <Segment basic padded='very' vertical>
                    <h2>All Cocktails</h2>
                    <CocktailSearch changeHandler={this.changeHandler} searchValue={this.state.searchValue} />
                    <Item.Group relaxed divided>
                        {this.renderAllCocktails()}
                    </Item.Group>
                    {/* <Card.Group centered >
                        {this.renderAllCocktails()}
                    </Card.Group> */}
                </Segment>
                 : <h2>loading</h2>
                 }
            </>
        );
    }
}


function mdp(dispatch){
    return{
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


export default connect(msp, mdp)(AllCocktails);
import React, { Component } from 'react';
import { Dropdown, Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails} from '../Redux/actions'

class FilterCocktails extends Component {

    state = {
        catOptions: []
    }

    componentDidMount() {
        console.log("in filter component cdm, props:", this.props.cocktailsApi)
        this.setCategories()
    }
    
    setCategories = () => {
        let allCats = this.props.cocktailsApi.map(cocktail => cocktail.category)
        let uniqueCats = [...new Set(allCats)]
        let selectionsObj = uniqueCats.map(category => ({ key: category, text: category, value: category }))
        this.setState({ catOptions: selectionsObj})
        // return selectionsObj
    }

    render() {
        return (
            <div>
                <h3>Plswork</h3>
                <Dropdown 
                    onChange={this.props.categoryHandler}
                    options={this.state.catOptions}
                    placeholder='Choose a Category'
                    selection
                    clearable
                    value={this.props.currentCat}
                />
            </div>
        );
    }
}

function mdp(dispatch){
    return{
        fetchCocktails: () => dispatch(getCocktails())
    }
}

function msp(state){
    return {
        cocktailsApi: state.cocktailsApi
    }
}

export default connect(msp, mdp)(FilterCocktails);
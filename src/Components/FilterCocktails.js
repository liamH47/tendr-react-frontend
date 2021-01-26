import React, { Component } from 'react';
import { Dropdown, Grid, Segment, Form, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails} from '../Redux/actions'

class FilterCocktails extends Component {

    componentDidMount() {
        this.props.fetchCocktails()
    }
    
    setCategories = () => {
        let allCats = this.props.cocktailsApi.map(cocktail => cocktail.category)
        let uniqueCats = [...new Set(allCats)]
        return uniqueCats.map(category => <option value={category}>{category}</option>)
    }

    render() {
        return (
        <div className='search-form'>
            <form>

            <h1>Search by name</h1>
            <input name='search' type="text" value={this.props.searchValue} onChange={this.props.changeHandler} placeholder="search by name" />
               

            <h1>Filter by category</h1>
            <select name='category' id='category' onChange={this.props.categoryHandler}>
                <option value="All">All</option>
                {this.setCategories()}
            </select>
            </form>
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
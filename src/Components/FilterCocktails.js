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
            <Form >
                <Form.Field>
                    <label>Search by Name</label>
                    <Form.Input type="text" value={this.props.searchValue} onChange={this.props.changeHandler} placeholder="search by name" />
                </Form.Field>                
            </Form>
            <h1>plswork</h1>
            <select name='category' id='category' onChange={this.props.categoryHandler}>
                <option value="All">All</option>
                {this.setCategories()}
            </select>
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
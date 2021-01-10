import React, { Component } from 'react';
import { Dropdown, Grid, Segment, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {getCocktails} from '../Redux/actions'

class FilterCocktails extends Component {

    state =  {
        searchValue: "",
        currentCat: "",
        categoryOptions: []
    }

    changeHandler = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    categoryHandler = (e) => {
        this.setState({...this.state, currentCat: e.target.value})
    }

    componentDidMount() {
        this.props.fetchCocktails()
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
        <div className='search-form'>
            <Form >
                <Form.Field>
                    <label>Search by Name</label>
                    <Form.Input type="text" value={this.props.searchValue} onChange={this.props.changeHandler} placeholder="search by name" />
                </Form.Field>
                <Form.Field>
                    <label>Filter by Category</label>
                    <Form.Dropdown 
                        onChange={this.props.categoryHandler}
                        options={this.props.categoryOptions}
                        placeholder='Choose a Category'
                        clearable
                        fluid
                        selection
                        value={this.state.currentCat}
                    />
                </Form.Field>
            </Form>
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
import React, { Component } from 'react';
import { Dropdown, Grid, Segment, Form, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails} from '../Redux/actions'

class FilterCocktails extends Component {

    // state =  {
    //     searchValue: "",
    //     currentCat: "",
    //     categoryOptions: []
    // }

    // changeHandler = (e) => {
    //     this.setState({ searchValue: e.target.value })
    // }

    // categoryHandler = (e) => {
    //     this.setState({...this.state, currentCat: e.target.value})
    // }

    componentDidMount() {
        this.props.fetchCocktails()
        // console.log("in filter component cdm, props:", this.props.cocktailsApi)
        // this.setCategories()
    }
    
    setCategories = () => {
        let allCats = this.props.cocktailsApi.map(cocktail => cocktail.category)
        let uniqueCats = [...new Set(allCats)]
        // let selectionsObj = 
        // return uniqueCats.map(category => ({ key: category, text: category, value: category }))
        return uniqueCats.map(category => <option value={category}>{category}</option>)
        // this.setState({ catOptions: selectionsObj})
        // return selectionsObj
    }

    render() {
        return (
        <div className='search-form'>
            {/* <Form >
                <Form.Field>
                    <label>Search by Name</label>
                    <Form.Input type="text" value={this.state.searchValue} onChange={this.changeHandler} placeholder="search by name" />
                </Form.Field>
                <Form.Field>
                    <label>Filter by Category</label>
                    <Form.Dropdown 
                        onChange={this.categoryHandler}
                        options={this.state.categoryOptions}
                        placeholder='Choose a Category'
                        clearable
                        fluid
                        search
                        selection
                        value={this.state.currentCat}
                    />
                </Form.Field>
            </Form> */}
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
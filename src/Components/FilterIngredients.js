import React, { Component } from 'react';
import { getIngredients } from '../Redux/actions';
import { connect } from 'react-redux'

class FilterIngredients extends Component {

    componentDidMount() {
        this.props.fetchIngredients()
    }
    
    setCategories = () => {
        let allCats = this.props.ingredientsApi.map(ingredient => ingredient.category)
        let uniqueCats = [...new Set(allCats)]
        return uniqueCats.map(category => <option value={category}>{category}</option>)
    }

    render() {
        return (
            <div>
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

function mapDispatchToProps(dispatch){
    return {
        fetchIngredients: () =>dispatch(getIngredients())   

    }
}
function mapStateToProps(state){
    return {
       ingredientsApi: state.ingredientsApi 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterIngredients);
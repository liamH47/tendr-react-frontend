import React, { Component } from 'react';
import { Segment, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class TendrHeader extends Component {
    render() {
        return (
            <div className='header'>
                <Segment textAlign='center' inverted vertical>
                    <h1><strong>tendr</strong></h1>
                    <Menu fluid inverted>
                    {/* <Menu.Item as={NavLink} to="/my_cocktails">My Cocktails</Menu.Item> */}
                    <Menu.Item as={NavLink} to="/welcome">Welcome</Menu.Item>
                    <Menu.Item as={NavLink} to="/find_ingredients">Find Ingredients</Menu.Item>
                    <Menu.Item as={NavLink} to="/explore_cocktails">Explore Cocktails</Menu.Item>
                    <Menu.Item as={NavLink} to="/my_ingredients">My Ingredients({this.props.userIngApi.length})</Menu.Item>
                    <Menu.Item as={NavLink} to="/shopping_list">Shopping List({this.props.shoppingListApi.length})</Menu.Item>
                    <Menu.Item as={NavLink} to="/saved_cocktails">Saved Cocktails({this.props.savedCocktails.length})</Menu.Item>
                </Menu>
                </Segment>               
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi,
        shoppingListApi: state.shoppingListApi,
        savedCocktails: state.savedCocktails
    }
}

export default connect(mapStateToProps)(TendrHeader);
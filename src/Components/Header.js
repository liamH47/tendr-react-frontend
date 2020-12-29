import React from 'react';
import {Segment, Sticky, Menu} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <Sticky>
            <Segment inverted vertical>
                <h1>welcome to tendr</h1>
                <Menu inverted>
                    <Menu.Item as={NavLink} to="/my_cocktails">My Cocktails</Menu.Item>
                    <Menu.Item as={NavLink} to="/my_ingredients">My Ingredients</Menu.Item>
                    <Menu.Item as={NavLink} to="/find_ingredients">Find Ingredients</Menu.Item>
                    <Menu.Item as={NavLink} to="/explore_cocktails">Explore Cocktails</Menu.Item>
                    <Menu.Item as={NavLink} to="/shopping_list">Shopping List</Menu.Item>
                </Menu>
            </Segment>
        </Sticky>
    )
}

export default Header
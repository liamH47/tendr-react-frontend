import React from 'react';
import { Sticky, Menu} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        // <Sticky>
            <div className='header-grid'>
                <Menu fluid vertical inverted>
                    {/* <Menu.Item as={NavLink} to="/my_cocktails">My Cocktails</Menu.Item> */}
                    <Menu.Item as={NavLink} to="/welcome">Welcome</Menu.Item>
                    <Menu.Item as={NavLink} to="/find_ingredients">Find Ingredients</Menu.Item>
                    <Menu.Item as={NavLink} to="/explore_cocktails">Explore Cocktails</Menu.Item>
                    <Menu.Item as={NavLink} to="/my_ingredients">My Ingredients</Menu.Item>
                    <Menu.Item as={NavLink} to="/shopping_list">Shopping List</Menu.Item>
                    <Menu.Item as={NavLink} to="/saved_cocktails">Saved Cocktails</Menu.Item>
                </Menu>
            </div>
        // </Sticky>
    )
}

export default Header
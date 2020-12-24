import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
 
function Navbar() {
    return (
            // <Segment basic inverted vertical>
                <Menu inverted>
                    <Menu.Item as={NavLink} to="/my_cocktails">My Cocktails</Menu.Item>
                    <Menu.Item as={NavLink} to="/my_ingredients">My Ingredients</Menu.Item>
                    <Menu.Item as={NavLink} to="/find_ingredients">Find Ingredients</Menu.Item>
                </Menu>
            // {/* </Segment> */}
            
    );
}

export default Navbar;
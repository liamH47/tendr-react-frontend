import React from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Menu, Segment } from 'semantic-ui-react'
 
function Navbar() {
    return (
            <Segment basic padded='very' vertical>
                <Menu>
                    <Menu.Item as={NavLink} to="/my_ingredients">My Ingredients</Menu.Item>
                </Menu>
            {/* <NavLink to="/my_ingredients">
                <Button 
                    content='My Ingredients'
                />
            </NavLink> */}

            </Segment>
            
    );
}

export default Navbar;
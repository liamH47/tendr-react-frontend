import React from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
 
function Navbar() {
    return (
        <div>
            <NavLink to="/my_ingredients">
                <Button 
                    content='My Ingredients'
                />
            </NavLink>
            
        </div>
    );
}

export default Navbar;
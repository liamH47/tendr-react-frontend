import React from 'react';
import { Form, Input } from 'semantic-ui-react'

const IngredientSearch = ({ searchValue, changeHandler }) => {
    return(
        <div>
            <form>
                <Input type="text" value={searchValue} onChange={changeHandler} placeholder="search by name" />
            </form>
        </div>
    ) 

}

export default IngredientSearch
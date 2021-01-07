import React from 'react';
import { Form, Input } from 'semantic-ui-react'

const IngredientSearch = ({ searchValue, changeHandler }) => {
    return(
        <div>
            <Form size='mini'>
                <Form.Input size='mini' type="text" value={searchValue} onChange={changeHandler} placeholder="search by name" />
            </Form>
        </div>
    ) 

}

export default IngredientSearch
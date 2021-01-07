import React from 'react';
import { Form, Input } from 'semantic-ui-react'

const CocktailSearch = ({ searchValue, changeHandler }) => {
    return(
        <div>
            <Form size='mini'>
                <Form.Input size='small' type="text" value={searchValue} onChange={changeHandler} placeholder="search by name" />
            </Form>
        </div>
    ) 

}

export default CocktailSearch
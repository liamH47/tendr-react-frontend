import React from 'react';
import { Form, FormInput, Input, Dropdown, Select } from 'semantic-ui-react'

const CocktailSearch = ({ searchValue, changeHandler, categoryHandler, currentCat, categoryOptions }) => {
    return(
        <div className='search-form'>
            <Form >
                <Form.Field>
                    <label>Search by Name</label>
                    <Form.Input type="text" value={searchValue} onChange={changeHandler} placeholder="search by name" />
                </Form.Field>
                <Form.Field>
                    <Form.Select 
                        fluid
                        options={categoryOptions}
                        placeholder='Category'
                        onChange={categoryHandler}
                        defaultValue='All'
                    />
                </Form.Field>
            </Form>
        </div>
    ) 

}

export default CocktailSearch
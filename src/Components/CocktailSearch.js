import React from 'react';
import { Form, FormInput, Input, Dropdown } from 'semantic-ui-react'

const CocktailSearch = ({ searchValue, changeHandler, categoryHandler, currentCat, categoryOptions }) => {
    return(
        <div className='search-form'>
            <Form >
                <Form.Field>
                    <label>Search by Name</label>
                    <Form.Input type="text" value={searchValue} onChange={changeHandler} placeholder="search by name" />
                </Form.Field>
                <Form.Field>
                    <label>Filter by Category</label>
                    <Form.Dropdown 
                        onChange={categoryHandler}
                        options={categoryOptions}
                        // placeholder='Choose a Category'
                        // clearable
                        fluid
                        // search
                        selection
                        value={currentCat}
                        defaultValue='All'
                    />
                </Form.Field>
            </Form>
        </div>
    ) 

}

export default CocktailSearch
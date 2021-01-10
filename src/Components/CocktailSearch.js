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
            </Form>
            {/* <Form>

                <Form.Field> */}
                    <label>Filter by Category</label>
                    <Dropdown 
                        onChange={categoryHandler, console.log("changing category")}
                        options={categoryOptions}
                        selection
                        value={currentCat}
                        defaultValue=''
                        />
                {/* </Form.Field>
            </Form> */}
        </div>
    ) 

}

export default CocktailSearch
// placeholder='Choose a Category'
// clearable
// fluid
// search
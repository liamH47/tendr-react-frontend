import React from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react'

const CocktailFilter = ({ currentCat, categoryHandler, categoryOptions }) => {
    return(
        <div className='search-form'>
            <Dropdown 
                onChange={categoryHandler}
                options={categoryOptions}
                placeholder='Choose a Category'
                selection
                value={currentCat}
            />
            {/* <Form >
                <Form.Input type="text" value={currentCat} onChange={categoryHandler} placeholder="select category" />
            </Form> */}
        </div>
    ) 

}

export default CocktailFilter
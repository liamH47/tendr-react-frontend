import React, { Component } from 'react';

import Ingredient from '../Components/Ingredient';

class MyIngrContainer extends Component {




    
    renderIngredients = () => {
        console.log(this.props.userIngApi)
        let ingredientsArr = this.props.userIngApi
        return ingredientsArr.map(ingObj => <Ingredient key={ingObj.id} ingredient={ingObj} category={ingObj.category} name={ingObj.ingredient.name} image_url={ingObj.ingredient.image_url} />)
    }

    render() {
        return (
            <div>
                {this.renderIngredients()}
            </div>
        );
    }
}

export default MyIngrContainer;
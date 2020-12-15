import React, { Component } from 'react';
import {Segment} from 'semantic-ui-react'
import UserIngredient from '../Components/UserIngredient';

class MyIngrContainer extends Component {


    state = {
        userIngApi: []
      }



      deleteHandler = (id) => {
          const currentIngredients = this.state.userIngApi
          this.setState({ userIngApi: currentIngredients.filter(userIng => userIng.id !== id)})
          fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
              method: 'DELETE',
          })
          .then(r => r.json())
          .then(data => {
              let newArr = [...this.state.userIngApi]
              this.setState({ userIngApi: newArr})
          })
          .catch(console.log)
      }
    
      componentDidMount() {
        fetch('http://localhost:3000/api/v1/user_ingredients')
        .then(r => r.json())
        .then(data => this.setState({ userIngApi: data}))
    }

    
    renderMyIngredients = () => {
        let ingredientsArr = this.state.userIngApi
        return ingredientsArr.map(ingObj => <UserIngredient deleteHandler={this.deleteHandler} key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.ingredient.name} image_url={ingObj.ingredient.image_url} />)
    }

    render() {
        return (
            <Segment basic padded='very' vertical>
                {this.renderMyIngredients()}

            </Segment>

        );
    }
}

export default MyIngrContainer;
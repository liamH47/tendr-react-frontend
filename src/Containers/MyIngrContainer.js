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
            this.setState({ userIngApi: this.props.userIngs})
        }
        
        
        renderMyIngredients = () => {
            let ingredientsArr = this.state.userIngApi
            return ingredientsArr.map(ingObj => <UserIngredient deleteHandler={this.deleteHandler} key={ingObj.id} ingredient={ingObj} id={ingObj.id} category={ingObj.category} name={ingObj.name} image_url={ingObj.image_url} />)
        }
        
        render() {
            return (
                <Segment basic padded='very' vertical>
                {this.renderMyIngredients()}

            </Segment>
            );
        }
}

export default MyIngrContainer
//   runningLow = (running_low, id) => {
//     fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             "Accepts": "application/json"
//         },
//         body: JSON.stringify ( running_low )
//     }).then(r => r.json())
//     .then(newIng => {
//         let copiedArr = [...this.state.userIngApi]
//         let index = copiedArr.findIndex(newIng => newIng.id === id)
//         copiedArr[index] = newIng
//         newIng.running_low = running_low
//         this.setState({ userIngApi: copiedArr})
//     })
//     .catch(console.log)
//   }

  //maybe put whole userIngredient in state and pass that as first argument, similar to in post request
import React from 'react';
import './App.css';
import Header from './Components/Header'
import MyIngrContainer from './Containers/MyIngrContainer'
import AllIngContainer from './Containers/AllIngContainer'
import MyCocktailsCont from './Containers/MyCocktailsCont'
import ShoppingListCont from './Containers/ShoppingListCont'
import AllCocktails from './Containers/AllCocktails'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Components/Navbar'
import { Sticky } from 'semantic-ui-react'
import LogInContainer from './Containers/LogInContainer';
import { connect } from 'react-redux'

class App extends React.Component {

//   state = {
//     user: null
//   }

//   signUp = (userObj) => {
//     fetch('http://localhost:3000/api/v1/users', {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//         Accept: 'application/json'
//     },
//     body: JSON.stringify({ user: userObj })
//     })
//     .then(r => r.json())
//     .then(data => this.setState({ user: data.user}))
// }
  
  render() {

    return (
      <div className="App">
          <Header />
        <Switch>
          <Route path='/my_ingredients' render={() => <MyIngrContainer />} />
          <Route path='/find_ingredients' render={() => <AllIngContainer />} />
          <Route path='/my_cocktails' render={() => <MyCocktailsCont />} />
          <Route path='/explore_cocktails' render={() => <AllCocktails />}/>
          <Route path='/shopping_list' render={() => <ShoppingListCont />}/>
          <Route path='/welcome' render={() => <LogInContainer />} />
        </Switch>

      </div>
    );
  }
  }

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App);

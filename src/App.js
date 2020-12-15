import React from 'react';
import './App.css';
import Header from './Components/Header'
import MyIngrContainer from './Containers/MyIngrContainer'
import AllIngContainer from './Containers/AllIngContainer'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'

class App extends React.Component {

  state = {
    userIngs: []
  }

  addToMyIngs = (userIngObj) => {
    fetch('http://localhost:3000/api/v1/user_ingredients', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(userIngObj)
    })
    .then(r => r.json())
    .then(newUserIng => this.setState({ userIngs: [...this.state.userIngs, newUserIng] }))

  }

  render() {

    return (
      <div className="App">
        <Header />
        <Navbar />
        <Switch>
          <Route path='/my_ingredients' render={() => <MyIngrContainer />} />
          <Route path='/find_ingredients' render={() => <AllIngContainer />} />
        </Switch>

      </div>
    );
  }
  }

export default App;

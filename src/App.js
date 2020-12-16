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

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/user_ingredients')
    .then(r => r.json())
    .then(data => this.setState({ userIngs: data}))
  }
  

  render() {

    return (
      <div className="App">
        <Header />
        <Navbar />
        <Switch>
          <Route path='/my_ingredients' render={() => <MyIngrContainer userIngs={this.state.userIngs}/>} />
          <Route path='/find_ingredients' render={() => <AllIngContainer />} />
        </Switch>

      </div>
    );
  }
  }

export default App;

import React from 'react';
import './App.css';
import Header from './Components/Header'
import MyIngrContainer from './Containers/MyIngrContainer'
import AllIngContainer from './Containers/AllIngContainer'
import MyCocktailsCont from './Containers/MyCocktailsCont'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'

class App extends React.Component {

  
  render() {

    return (
      <div className="App">
        <Header />
        <Navbar />
        <Switch>
          <Route path='/my_ingredients' render={() => <MyIngrContainer />} />
          <Route path='/find_ingredients' render={() => <AllIngContainer />} />
          <Route path='/my_cocktails' render={() => <MyCocktailsCont />} />
        </Switch>

      </div>
    );
  }
  }

export default App;

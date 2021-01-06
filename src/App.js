import React from 'react';
import './App.css';
// import MyIngrContainer from './Containers/MyIngrContainer'
// import SavedCocktailsCont from './Containers/SavedCocktailsCont'
// import AllIngContainer from './Containers/AllIngContainer'
// import MyCocktailsCont from './Containers/MyCocktailsCont'
// import ShoppingListCont from './Containers/ShoppingListCont'
// import LogInContainer from './Containers/LogInContainer';
// import AllCocktails from './Containers/AllCocktails'import Header from './Components/Header'
import Header from './Components/Header'
import { BrowserRouter } from 'react-router-dom'
// import Navbar from './Components/Navbar'
import { Container } from 'semantic-ui-react'
// import { connect } from 'react-redux'
// import { loggedIn } from './Redux/actions'
import MainContainer from './Containers/MainContainer'

class App extends React.Component {


  
  
  render() {

    return (
      <div className="App">
          {/* <Header />
        <Switch>
          <Route path='/my_ingredients' render={() => <MyIngrContainer />} />
          <Route path='/find_ingredients' render={() => <AllIngContainer />} />
          <Route path='/my_cocktails' render={() => <MyCocktailsCont />} />
          <Route path='/explore_cocktails' render={() => <AllCocktails />}/>
          <Route path='/shopping_list' render={() => <ShoppingListCont />}/>
          <Route path='/welcome' render={() => <LogInContainer />} />
          <Route path='/saved_cocktails' render={() => <SavedCocktailsCont />} />
        </Switch> */}
          <BrowserRouter>
            <div className='main'>
              <Header />
              <MainContainer />
            </div>
          </BrowserRouter>
      </div>
    );
  }
  }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchCurrentUser: () => dispatch(loggedIn())
//   }
// }

// function mapStateToProps(state) {
//   return {
//     currentUser: state.currentUser
//   }
// }

export default App;
// connect(mapStateToProps)(App)
import React from 'react';
import './App.css';
import Header from './Components/Header'
import { BrowserRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import MainContainer from './Containers/MainContainer'
import TendrHeader from './Components/TendrHeader';
import Footer from './Components/Footer'

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
              <TendrHeader />
              {/* <Header /> */}
              <MainContainer />
              <Footer />
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
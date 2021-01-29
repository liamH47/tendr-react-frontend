import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import MyIngrContainer from './MyIngrContainer'
import SavedCocktailsCont from './SavedCocktailsCont'
import AllIngContainer from './AllIngContainer'
import MyCocktailsCont from './MyCocktailsCont'
import ShoppingListCont from './ShoppingListCont'
import LogInContainer from './LogInContainer';
import AllCocktails from './AllCocktails'
import { loggedIn } from '../Redux/actions'
import { connect } from 'react-redux'

class MainContainer extends Component {

    render() {
        return (
            <div className='main-content'>
                <Switch>
                    <Route path='/welcome' render={() => <LogInContainer />} />
                    <Route path='/my_ingredients' render={() => <MyIngrContainer />} />
                    <Route path='/find_ingredients' render={() => <AllIngContainer />} />
                    <Route path='/my_cocktails' render={() => <MyCocktailsCont />} />
                    <Route path='/explore_cocktails' render={() => <AllCocktails />}/>
                    <Route path='/shopping_list' render={() => <ShoppingListCont />}/>
                    <Route path='/saved_cocktails' render={() => <SavedCocktailsCont />} />
                    <Route path='*' component={LogInContainer} />
                </Switch>               

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCurrentUser: () => dispatch(loggedIn())
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));
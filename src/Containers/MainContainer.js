import React, { Component } from 'react';
import Header from '../Components/Header'
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
// import AllCocktails from './AllCocktails'

class MainContainer extends Component {

    componentDidMount() {
        // this.props.fetchCurrentUser()
    }
    

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/my_ingredients' render={() => <MyIngrContainer />} />
                    <Route path='/find_ingredients' render={() => <AllIngContainer />} />
                    <Route path='/my_cocktails' render={() => <MyCocktailsCont />} />
                    <Route path='/explore_cocktails' render={() => <AllCocktails />}/>
                    <Route path='/shopping_list' render={() => <ShoppingListCont />}/>
                    <Route path='/welcome' render={() => <LogInContainer />} />
                    <Route path='/saved_cocktails' render={() => <SavedCocktailsCont />} />
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
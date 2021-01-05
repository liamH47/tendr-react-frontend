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

    state = {
        user: null
    }

    // componentDidMount() {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         fetch('http://localhost:3000/api/v1/profile', {
    //             method: 'GET',
    //             headers: { Authorization: `Bearer ${token}`},
    //         })
    //         .then(r => r.json())
    //         .then(data => this.setState({ user: data.user }))
    //     } else {
    //         return "Please log in"
    //     }
    // }
    componentDidMount() {
        const token = localStorage.getItem('token')
        if(token) {
            return this.props.fetchCurrentUser()
        } else {
            return "please log in"
        }
        console.log(this.props.currentUser)
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
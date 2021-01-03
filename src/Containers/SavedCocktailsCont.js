import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSavedCocktails } from '../Redux/actions'
import CocktailItem from '../Components/CocktailItem'
import { Segment, Item } from 'semantic-ui-react'

class SavedCocktailsCont extends Component {

    componentDidMount() {
        this.props.fetchSavedCocktails()
        // debugger
    }

    renderCocktails = () => {
        let id = this.props.currentUser.user.id
        let filtered = this.props.savedCocktails.filter(cocktail => cocktail.user_id === id)
        return filtered.map(tailObj => <CocktailItem key={tailObj.id} id={tailObj.id} cocktail={tailObj.cocktail} />)
    }
    

    render() {
        return(
        <Segment basic padded='very' vertical>
            <h2>Saved Cocktails</h2>
            <Item.Group divided>
                {this.renderCocktails()}
            </Item.Group>
        </Segment>
        )
    }
}

    function mdp(dispatch){
        return{
            fetchSavedCocktails: () => dispatch(getSavedCocktails())
        }
    }

    function msp(state){
        return {
            currentUser: state.currentUser,
            savedCocktails: state.savedCocktails
        }
    }

export default connect(msp, mdp)(SavedCocktailsCont);
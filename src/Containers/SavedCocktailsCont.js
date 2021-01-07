import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSavedCocktails } from '../Redux/actions'
import SavedCocktailItem from '../Components/SavedCocktailItem'
import { Segment, Item, Card } from 'semantic-ui-react'

class SavedCocktailsCont extends Component {

    componentDidMount() {
        this.props.fetchSavedCocktails()
        // debugger
    }

    renderCocktails = () => {
        console.log("in renderCocktails:", this.props.savedCocktails)
        let id = this.props.currentUser.user.id
        let filtered = this.props.savedCocktails.filter(cocktail => cocktail.user_id === id)
        return filtered.map(tailObj => <SavedCocktailItem key={tailObj.id} id={tailObj.id} savedCocktail={tailObj} cocktail={tailObj.cocktail} />)
    }
    

    render() {
        return(
        <>
        {this.props.savedCocktails.length ? 
        <Segment basic padded='very' vertical>
            <h2>Saved Cocktails</h2>
            <Card.Group centered >
                {this.renderCocktails()}
            </Card.Group>
        </Segment>
        : <h2>loading</h2>}
        </>
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
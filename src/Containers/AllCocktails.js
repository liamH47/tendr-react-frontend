import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getCocktails } from '../Redux/actions'
import Cocktail from '../Components/Cocktail'

class AllCocktails extends Component {

    componentDidMount() {
        this.props.fetchCocktails()
    }

    renderAllCocktails = () => {
        return this.props.cocktailsApi.map(cocktail => <Cocktail cocktail={cocktail} id={cocktail.id} key={cocktail.id} />)
    }
    
    render() {
        return (
            <Segment basic padded='very' vertical>
                <h2>All Cocktails</h2>
                <Card.Group centered>
                    {this.renderAllCocktails()}
                </Card.Group>
            </Segment>
        );
    }
}


function mdp(dispatch){
    return{
        fetchCocktails: () => dispatch(getCocktails())
    }
}

function msp(state){
    return {
        cocktailsApi: state.cocktailsApi
    }
}


export default connect(msp, mdp)(AllCocktails);
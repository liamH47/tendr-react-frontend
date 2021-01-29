import React, { Component } from 'react';
import { Segment, Image, Card, Container, Divider, Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails} from '../Redux/actions'
import FilterCocktails from '../Components/FilterCocktails'
import CocktailItem from '../Components/CocktailItem'
import Loading from '../Components/Loading'

class AllCocktails extends Component {

    state =  {
        searchValue: "",
        currentCat: "All"
    }

    changeHandler = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    categoryHandler = (e) => {
        this.setState({ currentCat: e.target.value})
    }

    renderAllCocktails = () => {
        let sorted = this.props.cocktailsApi.sort((a, b) => this.howManyIngs(a) - this.howManyIngs(b))
        let searchArray = sorted.filter(cocktail => cocktail.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
        if(this.state.currentCat === "All"){
            return searchArray.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
        } else {
            let filtered = searchArray.filter(cocktail => cocktail.category.includes(this.state.currentCat))
            return filtered.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
        }
    }

    componentDidMount() {
        this.props.fetchCocktails()
        this.props.fetchUserIngredients()
    }
    
    renderMyCocktails = () => {
        let filtered = this.props.cocktailsApi.filter(el => this.checkCanMake(el, this.props.userIngApi) === true)
        return filtered.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
    }
    
    howManyIngs = (cocktailObj) => {
        let cocktail = cocktailObj.cocktail_ingredients
        let ingNames = this.props.userIngApi.map(ingredient => ingredient.name)
        let hasThis = cocktail.filter((ing) => ingNames.includes(ing.name))
        return cocktail.length - hasThis.length
    }
    
    checkCanMake(singleCockt, userIngApi) {
        let cocktail = singleCockt.cocktail_ingredients
        return cocktail.every(function(ing) {
            return userIngApi.some(function(ing2) {
                return (ing.name == ing2.name) && (ing.quantity <= ing2.quantity) 
            })
        })
    }
    
    render() {
        return (
            <> {this.props.cocktailsApi.length ? 
                <Container className='cocktails-container' textAlign='center'>
                    <Segment className='search-container' textAlign='center' basic padded='very' vertical>
                        <FilterCocktails changeHandler={this.changeHandler} searchValue={this.state.searchValue} categoryHandler={this.categoryHandler} currentCat={this.state.currentCat} />
                    </Segment>
                    <Divider section horizontal></Divider>
                        <Card.Group className='card-group' centered >
                            {this.renderAllCocktails()}
                        </Card.Group>
                        <>
                        <Divider horizontal></Divider>
                        </>
                </Container>
                 : <Loading />}
            </>
        );
    }
}


function mapDispatchToProps(dispatch){
    return{
        fetchUserIngredients: () => dispatch(getUserIngredients()),
        fetchCocktails: () => dispatch(getCocktails())
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllCocktails);

import React, { Component } from 'react';
import { Segment, Image, Card, Container, Divider, Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUserIngredients, getCocktails} from '../Redux/actions'
import FilterCocktails from '../Components/FilterCocktails'
// import CocktailFilter from '../Components/FilterCocktails'
import CocktailItem from '../Components/CocktailItem'
import CocktailSearch from '../Components/CocktailSearch'
import Loading from '../Components/Loading'

class AllCocktails extends Component {

    state =  {
        searchValue: "",
        currentCat: "",
        categoryOptions: []
    }

    changeHandler = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    categoryHandler = (e) => {
        this.setState({currentCat: e.target.value})
    }

    componentDidMount() {
        this.props.fetchCocktails()
        this.categoriesArr()
        // console.log(this.props.currentUser)
        // debugger
    }

    categoriesArr = () => {
        let allCats = this.props.cocktailsApi.map(cocktail => cocktail.category)
        let uniqueCats = [...new Set(allCats)]
        let selectionsObj = uniqueCats.map(category => ({ key: category, text: category, value: category }))
        this.setState({ categoryOptions: selectionsObj})
    }

    renderAllCocktails = () => {
        // let filtered = this.props.cocktailsApi.filter(el => this.checkCanMake(el, this.props.userIngApi) === false)
        // let sorted = filtered.sort((a, b) => this.howManyIngs(a) - this.howManyIngs(b))
        let sorted = this.props.cocktailsApi.sort((a, b) => this.howManyIngs(a) - this.howManyIngs(b))
        let searchArray = sorted.filter(cocktail => cocktail.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
        let filtered = searchArray.filter(cocktail => cocktail.category.includes(this.state.currentCat))
        return filtered.map(tailObj => <CocktailItem name={tailObj.name} image_url={tailObj.image_url} cocktail={tailObj} id={tailObj.id} key={tailObj.id} />)
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
                <Container textAlign='center'>
                    <Segment textAlign='center' basic padded='very' vertical>
                        <h2 className='content-header'>Search by Name</h2>
                        <CocktailSearch changeHandler={this.changeHandler} searchValue={this.state.searchValue} categoryHandler={this.categoryHandler} currentCat={this.state.currentCat} categoryOptions={this.state.categoryOptions} />
                        <Dropdown
                            onChange={this.categoryHandler}
                            options={this.state.categoryOptions}
                            placeholder='Choose a Category'
                            selection
                            value={this.state.currentCat}
                        />
                        {/* <FilterCocktails categoryHandler={this.categoryHandler} currentCat={this.state.currentCat} categoryOptions={this.state.categoryOptions} /> */}
                    </Segment>
                        <h2 className='content-header'>All Cocktails</h2>
                        <Card.Group className='card-group' centered >
                            {this.renderAllCocktails()}
                        </Card.Group>
                        <>
                        <Divider horizontal></Divider>
                        </>
                        {/* <Item.Group relaxed divided>
                            {this.renderAllCocktails()}
                        </Item.Group> */}
                        <h2 className='content-header'>Possible Cocktails</h2>
                        <Card.Group className='card-group' centered >
                            {this.renderMyCocktails()}
                        </Card.Group>
                </Container>
                 : <Loading />}
            </>
        );
    }
}


function mdp(dispatch){
    return{
        fetchUserIngredients: () => dispatch(getUserIngredients()),
        fetchCocktails: () => dispatch(getCocktails())
    }
}

function msp(state){
    return {
        currentUser: state.currentUser,
        userIngApi: state.userIngApi,
        cocktailsApi: state.cocktailsApi
    }
}


export default connect(msp, mdp)(AllCocktails);
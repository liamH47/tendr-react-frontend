import {combineReducers} from 'redux'

const defaultState = {
    running_low: false,
    userIngApi: [],
    userCocktails: [],
    ingredientsApi: []
}

function runLowReducer(state = defaultState.running_low, action) {
    switch (action.type) {
        case "TOGGLE_RUNNING_LOW":
            return true
        default:
            return state
    }
}

function ingredientsReducer(state = defaultState.ingredientsApi, action) {
    switch (action.type) {
        case "FETCH_INGREDIENTS":
            return action.payload
        default:
            return state 
    }
}

function userIngredientsReducer(state = defaultState.userIngApi, action) {
    switch (action.type) {
        case "FETCH_USER_INGREDIENTS":
            return action.payload
        case "ADD_USER_INGREDIENT":
            return [...state, action.payload]
        case "DELETE_USER_INGREDIENT":
            const ingredients = state.filter(obj => obj.id !==action.id)
            return { ...state, ingredients }
        default:
            return state 
    }
}

const rootReducer = combineReducers({
    running_low: runLowReducer,
    ingredientsApi: ingredientsReducer,
    userIngApi: userIngredientsReducer
})

export default rootReducer
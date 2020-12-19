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
            console.log("state in inc counter", state )
            return true
        default:
            return state
    }
}

function ingredientsReducer(state = defaultState.ingredientsApi, action) {
    switch (action.type) {
        case "FETCH_INGREDIENTS":
            console.log("inside of ingredients reducer", action.payload)
            return action.payload
        default:
            return state 
    }
}

const rootReducer = combineReducers({
    running_low: runLowReducer,
    ingredientsApi: ingredientsReducer
})

export default rootReducer
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

const rootReducer = combineReducers({
    running_low: runLowReducer
})

export default rootReducer
import {combineReducers} from 'redux'

const defaultState = {
    running_low: false,
    userIngApi: [],
    cocktailsApi: [],
    ingredientsApi: [],
    shoppingListApi: []
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

function cocktailsReducer(state = defaultState.cocktailsApi, action) {
    switch (action.type) {
        case "FETCH_COCKTAILS":
            return action.payload
        default:
            return state 
    }
}

function shoppingReducer(state = defaultState.shoppingListApi, action) {
    switch (action.type) {
        case "FETCH_SHOPPING_LIST":
            return action.payload
        case "ADD_TO_SHOPPING_LIST":
            return [...state, action.payload]
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
            console.log("payload", action.payload);
            let copyState = [...state]
            const index = copyState.findIndex(obj => obj.id === action.payload)
            console.log(index, copyState);
            copyState.splice(index, 1)
            console.log(copyState);
            return copyState
            //.slice deletes the correct one but needs a refresh 
            //.splice deletes them one by one but does not always delete the right one
            // let ingredients = state.filter(obj => obj.id !== action.payload.id)
            // return { ...state, ingredients } request goes through but all ingredients are removed until refresh


        default:
            return state 
    }
}

const rootReducer = combineReducers({
    running_low: runLowReducer,
    ingredientsApi: ingredientsReducer,
    userIngApi: userIngredientsReducer,
    cocktailsApi: cocktailsReducer,
    shoppingListApi: shoppingReducer
})

export default rootReducer
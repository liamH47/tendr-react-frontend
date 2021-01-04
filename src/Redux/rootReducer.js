import {combineReducers} from 'redux'

const defaultState = {
    currentUser: null,
    running_low: false,
    userIngApi: [],
    cocktailsApi: [],
    ingredientsApi: [],
    shoppingListApi: [],
    savedCocktails: []
}

function userReducer(state = defaultState.currentUser, action) {
    switch(action.type) {
        case "CREATE_USER":
            return action.payload
        case "LOGIN_USER":
            return action.payload
        case "LOGGED_IN_USER":
            return action.payload
        default:
            return state
    }
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
        case "DELETE_LIST_ITEM":
            console.log("payload", action.payload);
            let copyState = [...state]
            const index = copyState.findIndex(obj => obj.id === action.payload)
            console.log(index, copyState);
            copyState.splice(index, 1)
            console.log(copyState);
            return copyState
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
        default:
            return state 
    }
}

function savedCocktailsReducer(state= defaultState.savedCocktails, action) {
    switch (action.type) {
        case "SAVE_COCKTAIL":
            return [...state, action.payload]
        case "FETCH_SAVED_COCKTAILS":
            return action.payload
        case "ADD_NOTE_TO_SAVED_COCKTAIL":
            let copyState2 = [...state]
            let index2 = copyState2.findIndex(savedObj => savedObj.id === action.payload.id)
            copyState2[index2] = action.payload
            console.log("index2:", index2)
            console.log("copystate:", copyState2)
            console.log("payload:", action.payload)
            return copyState2
            // return action.payload
        case "DELETE_SAVED_COCKTAIL":
            console.log("payload", action.payload);
            let copyState = [...state]
            const index = copyState.findIndex(obj => obj.id === action.payload)
            console.log(index, copyState);
            copyState.splice(index, 1)
            console.log(copyState);
            return copyState

        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    running_low: runLowReducer,
    ingredientsApi: ingredientsReducer,
    userIngApi: userIngredientsReducer,
    cocktailsApi: cocktailsReducer,
    shoppingListApi: shoppingReducer,
    savedCocktails: savedCocktailsReducer
})

export default rootReducer
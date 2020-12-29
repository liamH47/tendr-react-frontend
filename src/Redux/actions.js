import { 
    ADD_USER_INGREDIENT, 
    FETCH_INGREDIENTS, 
    DELETE_USER_INGREDIENT, 
    FETCH_USER_INGREDIENTS,
    FETCH_COCKTAILS,
    ADD_TO_SHOPPING_LIST,
    FETCH_SHOPPING_LIST,
    DELETE_LIST_ITEM
} from './actionTypes'

export function toggleRunningLow() {
    return { type: "TOGGLE_RUNNING_LOW" }
}

export function getIngredients() {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/ingredients')
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_INGREDIENTS, payload: data}))
    }
}

export function getUserIngredients() {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/user_ingredients')
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_USER_INGREDIENTS, payload: data}))
    }
}

export function getCocktails() {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/cocktails')
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_COCKTAILS, payload: data}))
    }
}



export function addIngredient(userIngObj){
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/user_ingredients', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
          },
          body: JSON.stringify(userIngObj)
        })
        .then(r => r.json())
        .then(obj => {
            dispatch({ type: ADD_USER_INGREDIENT, payload: obj})
            console.log("inside post", obj)
            })

    }

}

export function addToShoppingList(ingredient){
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/shopping_list_items', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
          },
          body: JSON.stringify(ingredient)
        })
        .then(r => r.json())
        .then(obj => {
            dispatch({ type: ADD_TO_SHOPPING_LIST, payload: obj})
            console.log("inside post", obj)
            })
    }
}

export function getShoppingList() {
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/shopping_list_items')
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_SHOPPING_LIST, payload: data}))
    }
}

export function deleteListItem(id) {
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/shopping_list_items/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            dispatch({type: DELETE_LIST_ITEM, payload: id})
            console.log("inside fetch", data);
        })
        ;
    }
}

export function deleteIngredient(id) {
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
            method: 'DELETE'
        })
        .then(data => {
            dispatch({type: DELETE_USER_INGREDIENT, payload: id})
            console.log("inside fetch", data);

        })
        ;
    }
}

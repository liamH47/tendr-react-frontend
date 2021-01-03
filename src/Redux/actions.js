import { 
    ADD_USER_INGREDIENT, 
    FETCH_INGREDIENTS, 
    DELETE_USER_INGREDIENT, 
    FETCH_USER_INGREDIENTS,
    FETCH_COCKTAILS,
    ADD_TO_SHOPPING_LIST,
    FETCH_SHOPPING_LIST,
    DELETE_LIST_ITEM, 
    CREATE_USER,
    LOGIN_USER,
    SAVE_COCKTAIL,
    FETCH_SAVED_COCKTAILS
} from './actionTypes'

export function toggleRunningLow() {
    return { type: "TOGGLE_RUNNING_LOW" }
}

export function getIngredients() {
    const token = localStorage.getItem('token')

    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/ingredients', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_INGREDIENTS, payload: data}))
    }
}

export function getUserIngredients() {
    const token = localStorage.getItem('token')
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/user_ingredients', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_USER_INGREDIENTS, payload: data}))
    }
}

export function getCocktails() {
    const token = localStorage.getItem('token')
    // debugger
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/cocktails', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_COCKTAILS, payload: data}))
    }
}

export function addIngredient(userIngObj){
    const token = localStorage.getItem('token')
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/user_ingredients', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json",
            Authorization: `Bearer ${token}`
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
    const token = localStorage.getItem('token')
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/shopping_list_items', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json",
            Authorization: `Bearer ${token}`
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
    const token = localStorage.getItem('token')
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/shopping_list_items', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_SHOPPING_LIST, payload: data}))
    }
}

export function deleteListItem(id) {
    const token = localStorage.getItem('token')
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/shopping_list_items/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(data => {
            dispatch({type: DELETE_LIST_ITEM, payload: id})
            console.log("inside fetch", data);
        })
        ;
    }
}

export function deleteIngredient(id) {
    const token = localStorage.getItem('token')
    return function(dispatch) {
        fetch(`http://localhost:3000/api/v1/user_ingredients/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(data => {
            dispatch({type: DELETE_USER_INGREDIENT, payload: id})
            console.log("inside fetch", data);

        })
        ;
    }
}

export function createUser(userObj) {
    
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userObj.username,
                password: userObj.password,
                email: userObj.email
            })
        })
        .then(r => r.json())
        .then(User => {dispatch({type: CREATE_USER, payload: User})
        })
    }

}

export function logInUser(loginInfo) {
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',

            },
            body: JSON.stringify({ user: loginInfo})
        })
        .then(r => r.json())
        .then(data => {
            // localStorage.setItem('user', JSON.stringify(data.user)); 
            localStorage.setItem('token', data.jwt);
            dispatch({type: LOGIN_USER, payload: data})
        })
}
}

export function saveCocktail(cocktailId, userId){
    const token = localStorage.getItem('token')
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/saved_cocktails', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
              user_id: userId,
              cocktail_id: cocktailId,
              notes: []
          })
        })
        .then(r => r.json())
        .then(obj => {
            dispatch({ type: SAVE_COCKTAIL, payload: obj})
            console.log("inside post", obj)
            })

    }

}

export function getSavedCocktails() {
    const token = localStorage.getItem('token')
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/saved_cocktails', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_SAVED_COCKTAILS, payload: data}))
    }
}
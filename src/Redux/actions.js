import { 
    ADD_USER_INGREDIENT, 
    FETCH_INGREDIENTS, 
    DELETE_USER_INGREDIENT, 
    FETCH_USER_INGREDIENTS 
} from './actionTypes'

export function toggleRunningLow() {
    return { type: "TOGGLE_RUNNING_LOW" }
}

export function getIngredients() {
    console.log("inside action creator")
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/ingredients')
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_INGREDIENTS, payload: data}))
    }
}

export function getUserIngredients() {
    console.log("inside action creator")
    return function(dispatch) {
        fetch('http://localhost:3000/api/v1/user_ingredients')
        .then(r => r.json())
        .then(data => dispatch({type: FETCH_USER_INGREDIENTS, payload: data}))
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
        .then(obj => dispatch({ type: ADD_USER_INGREDIENT, payload: obj}))

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

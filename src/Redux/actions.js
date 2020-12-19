import { FETCH_INGREDIENTS } from './actionTypes'


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
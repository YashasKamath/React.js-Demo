import { UPDATE_ADDRESS, UPDATE_EMAIL, UPDATE_NAME, UPDATE_RATING } from "./farmerTypes"

const initialState = {
    name : "",
    email : "",
    rating : "", 
    address : ""
}

const farmerReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_NAME : return {
            ...state,
            name : action.payload
        }
        case UPDATE_ADDRESS : return {
            ...state,
            address : action.payload
        }
        case UPDATE_EMAIL : return {
            ...state,
            email : action.payload
        }
        case UPDATE_RATING : return {
            ...state,
            rating : action.payload
        }
        default : return state
    }
}

export default farmerReducer
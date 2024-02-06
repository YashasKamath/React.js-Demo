import { UPDATE_FARMERS } from "./farmersTypes"

const initialState = {
    farmers : []
}

const farmersReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_FARMERS : return {
            farmers : [...state.farmers, action.payload]
        }
        default : return state
    }
}

export default farmersReducer
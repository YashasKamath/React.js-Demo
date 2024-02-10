import { FARMERS_DATA_CHANGED } from "./farmersTypes"

const initialState = {
    dataChanged : false
}

const farmersReducer = (state = initialState, action) => {
    switch(action.type){
        case FARMERS_DATA_CHANGED : return {
            ...state,
            dataChanged : !state.dataChanged
        }
        default : return state
    }
}

export default farmersReducer
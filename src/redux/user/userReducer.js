import { UPDATE_EMAIL } from "./userTypes"

const initialState = {
    email : ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_EMAIL : return {
            ...state,
            email : action.payload
        }
        default : return state
    }
}

export default userReducer
import { combineReducers } from "redux";
import farmersReducer from "./farmers/farmersReducer";
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
    farmers : farmersReducer,
    user : userReducer
})

export default rootReducer
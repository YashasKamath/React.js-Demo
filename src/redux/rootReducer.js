import { combineReducers } from "redux";
import farmersReducer from "./farmers/farmersReducer";

const rootReducer = combineReducers({
    farmers : farmersReducer
})

export default rootReducer
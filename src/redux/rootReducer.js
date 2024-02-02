import { combineReducers } from "redux";
import farmerReducer from "./farmer/farmerReducer";

const rootReducer = combineReducers({
    farmer : farmerReducer
})

export default rootReducer
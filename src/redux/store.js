import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { applyMiddleware } from "redux";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))

export default store
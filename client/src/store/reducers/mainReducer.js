import { combineReducers } from "redux";
import productReducer from "./productReducer";

const mainReducer = combineReducers({
   product: productReducer
})

export default mainReducer
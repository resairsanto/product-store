import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import preloaderReducer from "./preloaderReducer";

const mainReducer = combineReducers({
   product: productReducer,
   productDetail: productDetailReducer,
   preloader: preloaderReducer
})

export default mainReducer
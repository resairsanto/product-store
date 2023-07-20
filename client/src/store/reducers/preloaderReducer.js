const initialState = {
   preloader: false
}

function preloaderReducer(state = initialState, action) {
   switch (action.type) {
      case "preloader":
         return {
            ...state,
            preloader: action.payload
         }
      default:
         return state
   }
}

export default preloaderReducer
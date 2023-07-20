const initialState = {
   productDetail: ""
}

function productDetailReducer(state = initialState, action) {
   switch (action.type) {
      case 'fetchProductDetailSuccess':
         return {
            ...state,
            productDetail: action.payload
         }
      default:
         return state
   }
}

export default productDetailReducer
import axios from "axios";
const BASE_URL = "http://localhost:3000"

export const fetchProductsSuccess = (payload) => {
   return {
      type: "fetchProductsSuccess",
      payload
   }
}

export const fetchProducts = (page) => {
   return async (dispatch) => {
      try {
         console.log(page, "<<<< PAGE DI ACTION")
         let { data } = await axios(BASE_URL + "/product?page=" + page, {
            method: "GET",
            headers: {
               access_token: localStorage.access_token
            }
         })
         dispatch(fetchProductsSuccess(data))
      } catch (error) {
         console.log(error)
      }
   }
}
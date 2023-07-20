import axios from "axios";
const BASE_URL = "http://localhost:3000"

export const fetchProductsSuccess = (payload) => {
   return {
      type: "fetchProductsSuccess",
      payload
   }
}

export const loginSuccess = (payload) => {
   return {
      type: "loginSuccess",
      payload
   }
}

export const fetchProductDetailSuccess = (payload) => {
   return {
      type: "fetchProductDetailSuccess",
      payload
   }
}

export const preloader = (boolean) => {
   return {
      type: "preloader",
      payload: boolean
   }
}

export const submitRegister = (value) => {
   return async (dispatch) => {
      try {
         const { data } = await axios(BASE_URL + "/user/register", {
            method: "POST",
            data: value
         })
         Swal.fire(
            'Congratulations!',
            'Registered successfully',
            'success'
         )
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}

export const submitLogin = (value) => {
   return async (dispatch) => {
      try {
         dispatch(preloader(true))
         const { data } = await axios(BASE_URL + "/user/login", {
            method: "POST",
            data: value
         })
         localStorage.setItem("access_token", data.access_token)
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      } finally {
         setTimeout(() => {
            dispatch(preloader(false))
         }, 1000)
      }
   }
}

export const fetchProducts = (page) => {
   return async (dispatch) => {
      try {
         let { data } = await axios(BASE_URL + "/product?page=" + page, {
            method: "GET",
            headers: {
               access_token: localStorage.access_token
            }
         })
         dispatch(fetchProductsSuccess(data))
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}

export const fetchFilteredProducts = (searchValue) => {
   return async (dispatch) => {
      try {
         let { data } = await axios(BASE_URL + "/product?search=" + searchValue, {
            method: "GET",
            headers: {
               access_token: localStorage.access_token
            }
         })
         dispatch(fetchProductsSuccess(data))
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}

export const fetchProductDetail = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios(BASE_URL + "/product/" + id, {
            method: "GET",
            headers: {
               access_token: localStorage.access_token
            }
         })
         dispatch(fetchProductDetailSuccess(data))
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}

export const uploadImage = async (file) => {
   try {
      const { data } = await axios(BASE_URL + "/product/image", {
         method: "POST",
         data: file
      })
      return data
   } catch (error) {
      console.log(error)
   }
}

export const createProduct = (value) => {
   return async (dispatch) => {
      try {
         const { data } = await axios(BASE_URL + "/product/add", {
            method: "POST",
            data: value,
            headers: {
               access_token: localStorage.access_token
            }
         })
         Swal.fire(
            'Good Job!',
            'Successfully added a new product',
            'success'
         )
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}

export const editProduct = (value, id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios(BASE_URL + "/product/" + id, {
            method: "PUT",
            data: value,
            headers: {
               access_token: localStorage.access_token
            }
         })
         Swal.fire(
            'Good Job!',
            'Successfully edited a product',
            'success'
         )
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}

export const deleteProduct = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.delete(BASE_URL + "/product/" + id, {
            headers: {
               access_token: localStorage.access_token
            }
         });
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
         })
      }
   }
}
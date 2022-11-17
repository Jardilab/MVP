import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants';

export const getProducts = (currentPage =1, keyword = '', price) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST })

    let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

    const { data } = await axios.get(link)

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}

// Detail by product
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    })
  }
}

// Get products --> Admin
export const getAdminProducts = () => async (dispatch) => {
  try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST })

      const { data } = await axios.get('/api/admin/products')

      dispatch({
          type: ADMIN_PRODUCTS_SUCCESS,
          payload: data.products
      })
  } catch (error) {
      dispatch({
          type: ADMIN_PRODUCTS_FAIL,
          payload: error.response.data.message
      })
  }
}

// New product --> Admin
export const newProduct = ( productData ) => async (dispatch)=>{
  try {
      dispatch({type: NEW_PRODUCT_REQUEST})

      const config ={ 
          header: { 
              'Content-Type':'application/json'
          }
      }

      const {data} = await axios.post('/api/product/new', productData, config)

      dispatch({
          type: NEW_PRODUCT_SUCCESS,
          payload: data
      })
  }catch(error){
      dispatch({
          type: NEW_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }
}

// Delete product --> Admin
export const deleteProduct = (id) => async(dispatch)=>{
  try{
      dispatch ({type: DELETE_PRODUCT_REQUEST})
      const {data} = await axios.delete(`/api/product/${id}`)

      dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: data.success
      })
  } catch(error){
      dispatch({
          type: DELETE_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }
}

// Update product --> Admin
export const updateProduct = (id, productData) => async (dispatch) =>{
  try{
      dispatch ({type: UPDATE_PRODUCT_REQUEST})

      const config={
          headers: {
              "Content-Type": "application/json"
          }
      }
      const {data} = await axios.put(`/api/product/${id}`, productData, config)

      dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: data.success
      })
      
  } catch(error){
      dispatch({
          type: UPDATE_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }
}

// Clear error in dispatch
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
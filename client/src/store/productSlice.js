import { createSlice } from "@reduxjs/toolkit";
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

export const fetchAllSubCategories = () => async (dispatch) => {
  try {
    const response = await Axios(SummaryApi.getAllSubCategory)
    if (response.data.success) {
      dispatch(setAllSubCategory(response.data.data))
    }
  } catch (err) {
    console.log("Erro ao buscar subcategorias:", err)
  }
}

export const fetchAllCategories = () => async (dispatch) => {
    try {
      const response = await Axios(SummaryApi.getAllCategory)
      if (response.data.success) {
        dispatch(setAllCategory(response.data.data))
      }
    } catch (err) {
      console.log("Erro ao buscar categorias:", err)
    }
  }

const initialValue = {
    allCategory : [],
    loadingCategory : false,
    allSubCategory : [],
    product : []
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers : {
        setAllCategory : (state,action)=>{
            state.allCategory = [...action.payload]
        },
        setLoadingCategory : (state,action)=>{
            state.loadingCategory = action.payload
        },
        setAllSubCategory : (state,action)=>{
            state.allSubCategory = [...action.payload]
        },
        
    }
})

export const  { setAllCategory,setAllSubCategory,setLoadingCategory } = productSlice.actions

export default productSlice.reducer
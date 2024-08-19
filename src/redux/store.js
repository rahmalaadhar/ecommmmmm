import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"
import cartReducer from "../features/cartSlice"

const store = configureStore({
  reducer: {
    storearticles:articlesReducer,
    storecart : cartReducer
  }
})
export default store

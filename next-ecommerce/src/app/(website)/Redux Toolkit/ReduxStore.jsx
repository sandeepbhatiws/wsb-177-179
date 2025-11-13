import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './CartSlice'
import loginSlice from './LoginSlice'

export const reduxStore = configureStore({
  reducer: {
    cart : cartSlice,
    login : loginSlice
  },
})
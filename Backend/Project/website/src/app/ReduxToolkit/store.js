import { configureStore } from '@reduxjs/toolkit'
import userLogin from './loginSlice'

export const store = configureStore({
  reducer: {
    login : userLogin
  },
})
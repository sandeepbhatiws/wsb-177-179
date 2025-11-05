import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: 0,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login : (state) => {
        state.isLogin = 1;
    },
    logout : (state) => {
        state.isLogin = 0;
    },
    register : (state,value) => {
        state.isLogin = value.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = loginSlice.actions

export default loginSlice.reducer
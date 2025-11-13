import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const userLogin = Cookies.get('userLogin');

const initialState = {
  isLogin: userLogin ?? 0,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login : (state) => {
        state.isLogin = 1;
        Cookies.set('userLogin', 1)
    },
    logout : (state) => {
        state.isLogin = 0;
        Cookies.remove('userLogin')
    },
    register : (state,value) => {
        state.isLogin = value.payload;
        Cookies.set('userLogin', 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = loginSlice.actions

export default loginSlice.reducer
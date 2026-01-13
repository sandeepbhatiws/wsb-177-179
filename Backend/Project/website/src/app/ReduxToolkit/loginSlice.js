import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

var isLogin = Cookies.get('user_token');
var isLogin = isLogin ?? 0;

const initialState = {
  is_login: isLogin,
}

export const userLogin = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
    },
    register: (state) => {
    
    },
    logout: (state, action) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = userLogin.actions

export default userLogin.reducer
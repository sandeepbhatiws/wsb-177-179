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
    login: (state, action) => {
      console.log(action);
      state.is_login = action.payload;
      Cookies.set('user_token', action.payload);
    },
    register: (state) => {
    
    },
    logoutUser: (state) => {
      state.is_login = '';
      Cookies.remove('user_token');
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logoutUser } = userLogin.actions

export default userLogin.reducer
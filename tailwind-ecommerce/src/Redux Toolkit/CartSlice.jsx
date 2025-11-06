import { Description } from '@headlessui/react';
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

var getCartData = Cookies.get('cartItems');
var getCartData = getCartData ? JSON.parse(getCartData) : [];

const initialState = {
  cartItems: getCartData,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      var checkCart = state.cartItems.filter((v) => {
        if (v.id == action.payload.id) {
          return v;
        }
      })

      if (checkCart.length == 0) {
        // Add to cart
        const cartData = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          description: action.payload.description,
          image: action.payload.image,
          quantity: 1
        }

        const finalData = [cartData, ...state.cartItems];
        state.cartItems = finalData;
        toast.success('Add to Cart');
        Cookies.set('cartItems', JSON.stringify(state.cartItems));

      } else {
        // Update Cart
        const cartData = state.cartItems.map((v) => {
          if (v.id == action.payload.id) {
            if (v.quantity < 5) {
              v.quantity++;
              toast.success('Update Cart');
              return v;
            } else {
              toast.error('maximun quantity reached');
              return v;
            }

          } else {
            return v;
          }
        })

        state.cartItems = [...cartData];
        Cookies.set('cartItems', JSON.stringify(state.cartItems));
      }


    },
    increment: (state, action) => {
      const cartItems = state.cartItems.map((v) => {
        if (v.id == action.payload) {
          if (v.quantity < 5) {
            v.quantity++;
            toast.success('cart Updated')
            return v;
          } else {
            toast.error('Maximum value reached')
            return v;
          }
        } else {
          return v;
        }
      });


      state.cartItems = [...cartItems];
      Cookies.set('cartItems', JSON.stringify(state.cartItems));

    },
    decrement: (state, action) => {
      const cartItems = state.cartItems.map((v) => {
        if (v.id == action.payload) {
          if (v.quantity > 1) {
            v.quantity--;
            toast.success('cart Updated')
            return v;
          } else {
            toast.error('Minimum 1 qty is required')
            return v;
          }
        } else {
          return v;
        }
      });


      state.cartItems = [...cartItems];
      Cookies.set('cartItems', JSON.stringify(state.cartItems));
    },
    cartRemove : (state, action) => {
      const finalData = state.cartItems.filter((v) => {
        if(v.id != action.payload){
          return v;
        }
      })

      state.cartItems = [...finalData];

      Cookies.set('cartItems', JSON.stringify(state.cartItems));
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, increment, decrement, cartRemove } = cartSlice.actions

export default cartSlice.reducer
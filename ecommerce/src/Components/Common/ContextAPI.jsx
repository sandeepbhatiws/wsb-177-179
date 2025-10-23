import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

const Context = createContext(); // Exucutable Function

export default function ContextAPI({children}) {

    var cartData = localStorage.getItem('cartItems');
    var cartData = JSON.parse(cartData);

    var [cartItems, setCartItems] = useState(cartData ?? []);
    var [wishlistItems, setWishlistItems] = useState([]);

    const addToCart = (productInfo) => {
        var checkCart = cartItems.filter((v) => {
            if(v.id == productInfo.id){
                return v;
            }
        })

        if(checkCart.length > 0){
            var finalData = cartItems.map((v) => {
                if(v.id == productInfo.id){
                    if(v.quantity < 4){
                        v.quantity++;
                        toast.success('Update Cart');
                        return v;
                    } else {
                        toast.error('Maximum qty reached.')
                        return v;
                    }
                } else {
                    return v;
                }
            })

            finalData = [...finalData];
            localStorage.setItem('cartItems', JSON.stringify(finalData));
            setCartItems(finalData);
            
        } else {
            const data = {
                id : productInfo.id,
                name : productInfo.name,
                price : productInfo.price,
                description : productInfo.description,
                image : productInfo.image,
                quantity : 1
            }

            const finalData = [data, ...cartItems];
            localStorage.setItem('cartItems', JSON.stringify(finalData));
            setCartItems(finalData);
            toast.success('Add to cart');
        }
    }

    const deleteCart = (id) => {
        if(confirm('Are you sure you want to delete ?')){
            var finalData = cartItems.filter((v) => {
                if(v.id != id){
                    return v;
                }
            })

            var finalData = [...finalData];
            setCartItems(finalData);
            toast.success('Delete succussfully')
            localStorage.setItem('cartItems', JSON.stringify(finalData));
        }
        
    }

    var data = {cartItems, setCartItems, wishlistItems, setWishlistItems, addToCart, deleteCart}

  return (
    <>
      <Context.Provider value={data}>
        
        {children}

      </Context.Provider>
    </>
  )
}

export { Context };
import React, { useContext, useEffect, useState } from 'react'
import { Context } from './Common/ContextAPI';

export default function ViewCart() {

    const { cartItems} = useContext(Context);

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        var sum = 0;
        cartItems.forEach((v) => {
            sum += v.quantity*v.price;  // sum =sum + (v.quantity*v.price);
            // console.log(v.quantity, v.price)
        })

        setTotalAmount(sum);
    },[cartItems])

    

    return (
        <>
            <div class="container py-3">
                <h3>Shopping Cart</h3>
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                        {/* <!-- single cart item  --> */}
                        <hr />
                        {
                            cartItems.map((v,i) => {
                                return(
                                    <Cart key={i} cart={v}/>
                                )
                            })
                        }

                        {/* <!-- ./ single cart item end  --> */}
                    </div>
                    <div class="col-12 col-sm-12 col-md-8 col-lg-4">
                        <div class="bg-light rounded-3 p-4 sticky-top">
                            <h6 class="mb-4">Order Summary</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>Subtotal</div>
                                <div><strong>Rs. 5000</strong></div>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-between align-items-center">
                                <div>Delivery Charge</div>
                                <div><strong>Rs. 100</strong></div>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-between align-items-center">
                                <div>Total</div>
                                <div><strong>Rs.{totalAmount}</strong></div>
                            </div>
                            <button class="btn btn-primary w-100 mt-4">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Cart = ({cart}) => {

    const {deleteCart} = useContext(Context);  

    return (
        <>
            <div class="cart-item py-2">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="d-flex justify-content-between mb-3">
                            <img
                                class="cart-image d-block"
                                src={cart.image}
                                alt=""
                            />
                            <div class="mx-3">
                                <h5>{cart.name}</h5>
                                <p>{cart.description}</p>
                                <h5>Rs. {cart.price}</h5>
                                <small
                                    class="text-white bg-success px-2 py-1 d-inline-block rounded-3 mt-2"
                                >In Stock</small
                                >
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div class="d-flex justify-content-between">
                            <div>
                                <select class="form-select">
                                    <option selected={ cart.quantity == 1 ? 'selected' : ''} >1</option>
                                    <option value="2" selected={ cart.quantity == 2 ? 'selected' : ''} >2</option>
                                    <option value="3" selected={ cart.quantity == 3 ? 'selected' : ''} >3</option>
                                    <option value="4" selected={ cart.quantity == 4 ? 'selected' : ''} >4</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={ () => deleteCart(cart.id) }
                                    type="button"
                                    class="btn-close"
                                    aria-label="Close"
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
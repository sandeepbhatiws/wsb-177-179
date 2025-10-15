import React, { useEffect, useState } from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import ProductCard from './Common/ProductCard'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=12')
        .then((result) => {
            setProducts(result.data.data);
        })
        .catch(() => {
            toast.error('Something went wrong !')
        })
    }, []);


    return (
        <>
            <div className='container-fluid'>
                <div class="container bg-white">
                    <nav class="navbar navbar-expand-md navbar-light bg-white">
                        <div class="container-fluid m-3 justify-content-center text-center p-0"> <a class="navbar-brand  text-uppercase fw-800" href="#"><span class="border-red pe-2">New</span>Product</a> 
                        </div>
                    </nav>
                    <div class="row">
                        
                        {
                            products.map((value, index) => {
                                return(
                                    <ProductCard key={index} product={value} type="1"/>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>

        </>
    )
}

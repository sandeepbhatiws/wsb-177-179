import React from 'react'
import { Link } from 'react-router'
import { FaShoppingBag } from "react-icons/fa";

export default function ProductCard({ product, type, addToCart }) {
    return (
        <>
            <div class={ type == 1 ? "col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3" : "col-lg-4 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3"  }>
                <div class="product"> <img src={ product.image } alt="" />
                    <ul class="d-flex align-items-center justify-content-center list-unstyled icons">
                        <li class="icon"><span class="fas fa-expand-arrows-alt"></span></li>
                        <li class="icon mx-3"><span class="far fa-heart"></span></li>
                        <li class="icon" onClick={() => addToCart(product) }><FaShoppingBag /></li>
                    </ul>
                </div>
                <div class="tag bg-red">{ product.category_name }</div>
                <Link to={`/product-details/${product.id}`}>
                    <div class="title pt-4 pb-1">{ product.name }</div>
                </Link>
                
                <div class="d-flex align-content-center justify-content-center"> <span class="fas fa-star"></span> <span class="fas fa-star"></span> <span class="fas fa-star"></span> <span class="fas fa-star"></span> <span class="fas fa-star"></span> </div>
                <div class="price">$ {product.price}</div>
            </div>
        </>
    )
}

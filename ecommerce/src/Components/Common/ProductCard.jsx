import React from 'react'

export default function ProductCard() {
    return (
        <>
            <div class="col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3">
                <div class="product"> <img src="https://images.pexels.com/photos/54203/pexels-photo-54203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <ul class="d-flex align-items-center justify-content-center list-unstyled icons">
                        <li class="icon"><span class="fas fa-expand-arrows-alt"></span></li>
                        <li class="icon mx-3"><span class="far fa-heart"></span></li>
                        <li class="icon"><span class="fas fa-shopping-bag"></span></li>
                    </ul>
                </div>
                <div class="tag bg-red">sale</div>
                <div class="title pt-4 pb-1">Winter Sweater</div>
                <div class="d-flex align-content-center justify-content-center"> <span class="fas fa-star"></span> <span class="fas fa-star"></span> <span class="fas fa-star"></span> <span class="fas fa-star"></span> <span class="fas fa-star"></span> </div>
                <div class="price">$ 60.0</div>
            </div>
        </>
    )
}

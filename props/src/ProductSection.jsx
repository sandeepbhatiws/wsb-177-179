import React, { useState } from 'react'
import ProductCard from './ProductCard'

// //Method 1
// export default function ProductSection(data) {

//     console.log(data);

//     return (
//         <>
//             <div class="container text-center py-4">
//                 <h1> {data.title} </h1>
//                 <p>{data.description}</p>

//                 {data.children}
//             </div>
//             <div class="container">
//                 <div class="row">
//                     <ProductCard />
//                     <ProductCard />
//                     <ProductCard />
//                 </div>
//             </div>
//         </>
//     )
// }

//Method 2
export default function ProductSection({ title, description, children }) {

    const [products, setProducts] = useState([1,2,3,1,2,3]);

    return (
        <>
            <div class="container text-center py-4">
                <h1> {title} </h1>
                <p>{description}</p>

                {children}
            </div>
            <div class="container">
                <div class="row">
                    {
                        products.map(() => {
                            return(
                                <ProductCard />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

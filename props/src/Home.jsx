import React from 'react'
import ProductCard from './ProductCard'
import ProductSection from './ProductSection'

export default function Home() {
    var desc = 'Top Mentorship Programs in Tech, Marketing, & Data- Designed and Delivered by industry maestros.';

    return (
        <>

            <ProductSection title='Best Selling' description={ desc }/>

            <ProductSection title='Top Deals' description={ desc }>
                <div>{desc}</div>
            </ProductSection>
            
        </>
    )
}

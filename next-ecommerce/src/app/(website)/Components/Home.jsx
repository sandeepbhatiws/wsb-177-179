"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';

export default function Home({products}) {

    return (
        <>
            <section class="bg-white dark:bg-gray-900 text-center">
                <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        products.map((v, i) => {
                            return (
                                <ProductCard productData={v} />
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

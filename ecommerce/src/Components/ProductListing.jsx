import React, { useContext, useEffect, useState } from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './Common/ProductCard';
import ResponsivePagination from 'react-responsive-pagination';
import { MdDescription } from 'react-icons/md';
import { Context } from './Common/ContextAPI';

export default function ProductListing() {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [filterCategories, setFilterCategories] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);

    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [sorting, setSorting] = useState('');

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {
                limit: 12,
                page: currentPage,
                sorting : sorting,
                categories : filterCategories.toString(),
                brands : filterBrands.toString(),
                price_from : priceFrom,
                price_to : priceTo,
            }
        })
            .then((result) => {
                setProducts(result.data.data);
                setTotalPages(result.data.total_pages);
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })


    }, [currentPage, filterCategories, filterBrands, priceFrom, priceTo, sorting]);

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/categories.php`)
            .then((result) => {
                setCategories(result.data.data)
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/brands.php`)
            .then((result) => {
                setBrands(result.data.data)
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    const searchCategory = (slug) => {
        setCurrentPage(1)
        if(filterCategories.includes(slug)){
            const data = filterCategories.filter((value) => {
                if(value != slug){
                    return value;
                }
            })
            const finalData = [...data];
            setFilterCategories(finalData);
            console.log(finalData);
        } else {
            const finalData = [...filterCategories, slug];
            setFilterCategories(finalData);
            console.log(finalData);
        }
    }

    const searchBrand = (slug) => {
        setCurrentPage(1)
        if(filterBrands.includes(slug)){
            const data = filterBrands.filter((value) => {
                if(value != slug){
                    return value;
                }
            })
            const finalData = [...data];
            setFilterBrands(finalData);
            console.log(finalData);
        } else {
            const finalData = [...filterBrands, slug];
            setFilterBrands(finalData);
            console.log(finalData);
        }
    }

    const priceFilter = (from, to) => {
        setCurrentPage(1);
        setPriceFrom(from);
        setPriceTo(to);
    }

    const filterSorting = (i) => {
        setCurrentPage(1)
        setSorting(i)
    }

    const { addToCart } = useContext(Context);

    return (
        <>
            <div class="search-section">
                <div class="container-fluid container-xl">
                    <div class="row main-content ml-md-0">
                        <div class="sidebar col-md-3 px-0">
                            <h1 class="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                                <span class="mr-2 filter-close-btn">
                                    X
                                </span>
                                Filters
                                <span class="ml-auto text-uppercase">Reset Filters</span>
                            </h1>
                            <div class="sidebar__inner ">
                                <div class="filter-body">
                                    <div>
                                        <h2 class="border-bottom filter-title">Categories Options</h2>
                                        <div class="mb-30 filter-options">
                                            {
                                                categories.map((v, i) => {
                                                    return (
                                                        <div key={i} class="custom-control custom-checkbox mb-3">
                                                            <input 
                                                            onClick={ () => searchCategory(v.slug) } type="checkbox" class="custom-control-input me-2" id={v.slug} />
                                                            <label class="custom-control-label" for={v.slug}>{v.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>


                                        <h2 class="border-bottom filter-title"> Brands Options</h2>
                                        <div class="mb-30 filter-options">
                                            {
                                                brands.map((v, i) => {
                                                    return(

                                                    v.name != ''

                                                        ?
                                                        
                                                        
                                                        <div key={i} class="custom-control custom-checkbox mb-3">
                                                            <input 
                                                            onClick={ () => searchBrand(v.slug) }
                                                            type="checkbox" class="custom-control-input me-2" id={v.slug} />
                                                            <label class="custom-control-label" for={v.slug}>{v.name}</label>
                                                        </div>
                                                        



                                                        :

                                                        ''
                                                    )

                                                })
                                            }


                                        </div>

                                        <h2 class="border-bottom filter-title">Price Filter</h2>
                                        <div class="mb-30 filter-options">
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" onClick={ () => priceFilter(0,500)} name='price' class="custom-control-input me-2" id="0-500" />
                                                <label class="custom-control-label" for="0-500"> Rs. 0 - Rs. 500</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" onClick={ () => priceFilter(501,1000)} name='price' class="custom-control-input me-2" id="501-1000" />
                                                <label class="custom-control-label" for="501-1000">Rs. 501 - Rs. 1000</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" onClick={ () => priceFilter(1001,1500)} name='price' class="custom-control-input me-2" id="1001-1500" />
                                                <label class="custom-control-label" for="1001-1500">Rs. 1001 - Rs. 1500</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" onClick={ () => priceFilter(1501,2000)} name='price' class="custom-control-input me-2" id="1501-2000" />
                                                <label class="custom-control-label" for="1501-2000">Rs. 1501 - Rs. 2000</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" onClick={ () => priceFilter(2001, '')} name='price' class="custom-control-input me-2" id="2001" />
                                                <label class="custom-control-label" for="2001">Rs. 2001 and Above</label>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content col-md-9">
                            <div class="d-flex justify-content-between border-bottom align-items-center">
                                <h2 class="title">Products</h2>
                                <div class="filters-actions">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Sort By :-
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <li onClick={() => filterSorting(1)}><a class="dropdown-item" href="#">Name (A-Z)</a></li>
                                            <li onClick={() => filterSorting(2)}><a class="dropdown-item" href="#">Name (Z-A)</a></li>

                                            <li onClick={() => filterSorting(3)}><a class="dropdown-item" href="#">Price (Low to High)</a></li>

                                            <li onClick={() => filterSorting(4)}><a class="dropdown-item" href="#">Price (High to Low)</a></li>
                                        </ul>
                                        </div>
                                </div>
                            </div>
                            <div class="row row-grid">
                                {
                                    products.map((value, index) => {
                                        return (
                                            <ProductCard addToCart={addToCart} key={index} type="2" product={value} />
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <ResponsivePagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

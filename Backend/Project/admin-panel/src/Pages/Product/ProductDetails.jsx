import React, { useEffect, useState } from 'react'
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function ProductDetails() {

  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  const [parentCategory, setparentCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');


  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/view-colors`)
      .then((result) => {
        if(result.data._status == true){
          setColors(result.data._data);
        } else {
          setColors([])
        }
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong !!',
          position: 'topRight',
        });
      })

      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/view-materials`)
      .then((result) => {
        if(result.data._status == true){
          setMaterials(result.data._data);
        } else {
          setMaterials([])
        }
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong !!',
          position: 'topRight',
        });
      })

      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/view-categories`)
      .then((result) => {
        if(result.data._status == true){
          setCategories(result.data._data);
        } else {
          setCategories([])
        }
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong !!',
          position: 'topRight',
        });
      })
  }, []);

  useEffect(() => {
    if(parentCategory != ''){
      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/view-sub-categories`, {
        parent_category_id : parentCategory
      })
        .then((result) => {
          if(result.data._status == true){
            setSubCategories(result.data._data);
          } else {
            setSubCategories([])
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong !!',
            position: 'topRight',
          });
        })
    }
  }, [parentCategory])

  useEffect(() => {
    if(parentCategory != '' && subCategory != ''){
      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/view-sub-sub-categories`, {
        parent_category_id : parentCategory,
        sub_category_id : subCategory
      })
        .then((result) => {
          if(result.data._status == true){
            setSubSubCategories(result.data._data);
          } else {
            setSubSubCategories([])
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong !!',
            position: 'topRight',
          });
        })
    }
  }, [subCategory])

  const selectParentCategory = (event) => {
    setparentCategory(event.target.value);
    setSubCategories([])
    setSubSubCategories([]);
  }

  const selectSubCategory = (event) => {
    setSubCategory(event.target.value);
    setSubSubCategories([]);
  }

  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop ",
        replace: "Drag and drop ",
        remove: "Remove",
        error: "Oops, something went wrong"
      }
    });
  }, []);

  const [value, setValue] = useState('');


  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imagePath}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imagePath]); // ✅ Runs when `defaultImage` updates

  // update work
  const [updateIdState, setUpdateIdState] = useState('')
  const [productDetails, setProductDetails] = useState('');

  const navigate = useNavigate()

  let params = useParams()
  useEffect(() => {
    if (params.id != undefined) {
      setUpdateIdState(params.id)

      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/details/${params.id}`)
        .then((result) => {
          if (result.data._status == true) {
            setProductDetails(result.data._data)
            setparentCategory(result.data._data.parent_category_id);
            setSubCategory(result.data._data.sub_category_id)
            setValue(result.data._data.long_description)
            setImagePath(result.data._image_path + result.data._data.image);
          } else {
            setProductDetails('');
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong !!',
            position: 'topRight',
          });
        });
    }
  }, [params])

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    // const data = event.target

    data.append('long_description', value);

    if (params.id == undefined) {
      // Create Record API
      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/create`, data)
        .then((result) => {
          if (result.data._status == true) {
            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });

            event.target.reset();
            navigate('/product/view')

          } else {
            iziToast.error({
              title: 'Error',
              message: result.data._message,
              position: 'topRight',
            });
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong !!',
            position: 'topRight',
          });
        })
    } else {
      // Update Record API
      axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PRODUCT}/update/${params.id}`, data)
        .then((result) => {
          if (result.data._status == true) {
            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });

            event.target.reset();
            navigate('/product/view')

          } else {
            iziToast.error({
              title: 'Error',
              message: result.data._message,
              position: 'topRight',
            });
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong !!',
            position: 'topRight',
          });
        })
    }

  }


  return (
    <section className="w-full">

      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateIdState ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className='w-full px-6 py-6  '>

        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className="grid grid-cols-3 gap-[10px] ">
            {/* for left */}
            <div className="for-images ">

              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  name='image'
                  id="image"
                  className="dropify"
                  data-height="160"
                />
              </div>

              <div className="">
                <label
                  htmlFor="GalleryImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Gallery Image
                </label>
                <input
                  type="file"
                  name='images'
                  id="images"
                  className="dropify"
                  data-height="160"
                  multiple
                />
              </div>
            </div>

            {/* for midd */}
            <div className="middle">

              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Prodct Name
                </label>
                <input
                  type="text"
                  defaultValue={ productDetails.name }
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Prodct Name'
                  name='name'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select
                  name='sub_category_id'
                  onChange={selectSubCategory}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Category</option>
                  {
                    subCategories.map((v) => {
                      return(
                        <option value={v._id} selected={ productDetails.sub_category_id == v._id ? 'selected' : '' }   > {v.name} </option>
                      )
                    })
                  }

                </select>

              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Meterial
                </label>
                <select
                  name='material_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  
                  {
                    materials.map((v) => {
                      return(
                        <option value={v._id} selected={ productDetails.material_id == v._id ? 'selected' : '' }> {v.name} </option>
                      )
                    })
                  }

                </select>
              </div>
              
              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is New Arrival
                </label>
                <select
                  name='is_new_arrivals'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_new_arrivals == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_new_arrivals == 2 ? 'selected' : '' }>No</option>

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Featured
                </label>
                <select
                name='is_featured'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_featured == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_featured == 2 ? 'selected' : '' }>No</option>

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is On Sale
                </label>
                <select
                name='is_on_sale'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_on_sale == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_on_sale == 2 ? 'selected' : '' }>No</option>

                </select>
              </div>
              

              {/* <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Top Rated
                </label>
                <select
                name='is_top_rated'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
              </div> */}

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                name='actual_price'
                  type="text"
                  defaultValue={productDetails.actual_price}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Actual Price'
                />

              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Code
                </label>
                <input
                name='code'
                  type="text"
                  defaultValue={productDetails.code}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Code'
                />

              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Dimension
                </label>
                <input
                name='dimension'
                defaultValue={productDetails.dimension}
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Dimension'
                />

              </div>




            </div>

            {/* for right */}
            <div className="right-items">
              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Parent Category
                </label>
                <select
                  name='parent_category_id'
                  onChange={ selectParentCategory }
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  {
                    categories.map((v) => {
                      return(
                        <option value={v._id} selected={ productDetails.parent_category_id == v._id ? 'selected' : '' } > {v.name} </option>
                      )
                    })
                  }

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Sub Category
                </label>
                <select
                  name='sub_sub_category_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  {
                    subSubCategories.map((v) => {
                      return(
                        <option value={v._id} selected={ productDetails.sub_sub_category_id == v._id ? 'selected' : '' }> {v.name} </option>
                      )
                    })
                  }

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select
                  name='color_id'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  {
                    colors.map((v) => {
                      return(
                        <option value={v._id} selected={ productDetails.color_id == v._id ? 'selected' : '' }> {v.name} </option>
                      )
                    })
                  }

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Best Selling
                </label>
                <select
                name='is_best_selling'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_best_selling == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_best_selling == 2 ? 'selected' : '' }>No</option>

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Upsell
                </label>
                <select
                name='is_upsell'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_best_selling == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_best_selling == 2 ? 'selected' : '' }>No</option>

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Trending
                </label>
                <select
                name='is_trending'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ productDetails.is_best_selling == 1 ? 'selected' : '' }>Yes</option>
                  <option value="2" selected={ productDetails.is_best_selling == 2 ? 'selected' : '' }>No</option>

                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  type="text"
                  name='sale_price'
                  defaultValue={productDetails.sale_price}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Sale Price'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Delivery Days
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.delivery_days}
                  name='delivery_days'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Delivery Days'
                />
              </div>


              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  type="text"
                  defaultValue={productDetails.order}
                  name='order'
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Order'
                />
              </div>


            </div>
          </div>
          
          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Short Description
            </label>
            <textarea className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                   name='short_description' defaultValue={productDetails.short_description}></textarea>

          </div>



          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Description
            </label>
            <ReactQuill theme="snow" value={value} onChange={setValue} className='h-[200px]'  />

          </div>

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateIdState ? "Update Product " : "Add Product"}
          </button>

        </form>

      </div>
    </section>
  )
}


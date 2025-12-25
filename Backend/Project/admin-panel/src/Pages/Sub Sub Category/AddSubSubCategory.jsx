import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function AddSubSubCategory() {

  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [parentCategory, setParentCategory] = useState('');
  let [subCategory, setSubCategory] = useState('');

  const filterByCategory = (event) => {
    setParentCategory(event.target.value)
  }

  // Parent Category
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/view-categories`)
      .then((result) => {
        if (result.data._status == true) {
          setCategories(result.data._data)
        } else {
          setCategories([]);
        }
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong !!',
          position: 'topRight',
        });
      });
  }, []);

  // Sub Category
  useEffect(() => {
    if(parentCategory != ''){
      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/view-sub-categories`, {
        parent_category_id: parentCategory
      })
        .then((result) => {
          if (result.data._status == true) {
            setSubCategories(result.data._data)
          } else {
            setSubCategories([]);
          }
        })
        .catch(() => {
          iziToast.error({
            title: 'Error',
            message: 'Something went wrong !!',
            position: 'topRight',
          });
        });
    } else {
      setSubCategories([])
    }
  }, [parentCategory]);




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
  const [subSubCategoryDetails, setSubSubCategoryDetails] = useState('');

  const navigate = useNavigate()

  let params = useParams()
  useEffect(() => {
    if (params.id != undefined) {
      setUpdateIdState(params.id)

      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/details/${params.id}`)
        .then((result) => {
          if (result.data._status == true) {
            setSubSubCategoryDetails(result.data._data)
            setParentCategory(result.data._data.parent_category_id);
            setSubCategory(result.data._data.sub_category_id)
            setImagePath(result.data._image_path + result.data._data.image);
          } else {
            setSubSubCategoryDetails('');
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

    const data = event.target

    if (params.id == undefined) {
      // Create Record API
      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/create`, data)
        .then((result) => {
          if (result.data._status == true) {
            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });

            event.target.reset();
            navigate('/category/sub-sub-category/view')

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
      axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/update/${params.id}`, data)
        .then((result) => {
          if (result.data._status == true) {
            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });

            event.target.reset();
            navigate('/category/sub-sub-category/view')

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
      <Breadcrumb path={"Sub Category"} path2={"Add Sub Category"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form onSubmit={handleSubmit} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  className="dropify"
                  data-height="260"
                />
              </div>

              <div className="w-2/3">

                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    onChange={filterByCategory}
                    name="parent_category_id"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {
                      categories.map((v, i) => {
                        return (
                          <option value={v._id} selected={ v._id == parentCategory ? 'selected' : '' }   >{v.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Sub Category Name
                  </label>
                  <select
                    name="sub_category_id"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Sub Category</option>
                    {
                      subCategories.map((v, i) => {
                        return (
                          <option value={v._id}  selected={ v._id == subCategory ? 'selected' : '' }  >{v.name}</option>
                        )
                      })
                    }
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={subSubCategoryDetails.name}
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={subSubCategoryDetails.order}
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Sub Sub Category" : "Add Sub Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}

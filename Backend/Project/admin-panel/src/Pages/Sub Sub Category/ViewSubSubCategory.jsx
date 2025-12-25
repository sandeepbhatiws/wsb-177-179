import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ViewSubSubCategory() {

  let [activeFilter, setactiveFilter] = useState(true);
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [subSubCategories, setSubSubCategories] = useState([]);
  let [filterName, setFilterName] = useState('');
  let [parentCategory, setParentCategory] = useState('');
  let [subCategory, setSubCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [imagePath, setImagePath] = useState('');

  const [checkBoxValues, setCheckBoxValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);

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
  }, [parentCategory]);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/view`, {
      name: filterName,
      parent_category_id: parentCategory,
      sub_category_id: subCategory,
      page: currentPage
    })
      .then((result) => {
        if (result.data._status == true) {
          setSubSubCategories(result.data._data)
          setTotalPages(result.data._paginate.total_pages)
          setImagePath(result.data._image_path);
        } else {
          setSubSubCategories([]);
          setTotalPages(0)
        }
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong !!',
          position: 'topRight',
        });
      });
  }, [filterName, currentPage, parentCategory, apiStatus, subCategory]);

  const allCheckBox = () => {
    if (subSubCategories.length == checkBoxValues.length) {
      setCheckBoxValues([]);
    } else {
      var allValues = [];

      subSubCategories.forEach((value) => {
        allValues.push(value._id);
      })

      setCheckBoxValues(allValues);
    }
  }

  const singleCheckBox = (id) => {

    const checkRecord = checkBoxValues.filter((i) => {
      if (id == i) {
        return i;
      }
    })

    if (checkRecord.length == 0) {
      var finaldata = [...checkBoxValues, id];
      setCheckBoxValues(finaldata);
    } else {
      const finalRecord = checkBoxValues.filter((i) => {
        if (id != i) {
          return i;
        }
      })
      var finaldata = [...finalRecord];
      setCheckBoxValues(finaldata);
    }
  }

  const changeStatus = () => {
    if (checkBoxValues.length > 0) {

      axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/change-status`, {
        ids: checkBoxValues,
      })
        .then((result) => {
          if (result.data._status == true) {
            setCheckBoxValues([]);
            setApiStatus(!apiStatus);

            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });
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
        });

    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please seleact atlest 1 value.',
        position: 'topRight',
        // timeout: 3000,
        // transitionIn: 'fadeInDown',
        // transitionOut: 'fadeOutUp',
      });
    }
  }

  const destroy = () => {
    if (checkBoxValues.length > 0) {
      iziToast.question({
        overlay: true,
        title: 'Confirm',
        message: 'Do you really want to delete?',
        position: 'center',
        timeout: false,
        buttons: [
          [
            '<button><b>YES</b></button>',
            (instance, toast) => {
              instance.hide({}, toast);
              deleteRecord(); // your delete function
            },
            true
          ],
          [
            '<button>NO</button>',
            (instance, toast) => {
              instance.hide({}, toast);
            }
          ]
        ]
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please seleact atlest 1 value.',
        position: 'topRight',
        // timeout: 3000,
        // transitionIn: 'fadeInDown',
        // transitionOut: 'fadeOutUp',
      });
    }
  }

  const deleteRecord = () => {

    axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_SUB_SUB_CATEGORY}/delete`, {
      ids: checkBoxValues,
    })
      .then((result) => {
        if (result.data._status == true) {
          setCheckBoxValues([]);
          setApiStatus(!apiStatus);

          iziToast.success({
            title: 'Success',
            message: result.data._message,
            position: 'topRight',
          });
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
      });

  }

  const filterRecord = (event) => {
    event.preventDefault();
    setCurrentPage(1)
    setFilterName(event.target.name.value)
    setParentCategory(event.target.parent_category_id.value)
    setSubCategory(event.target.sub_category_id.value)
  }

  const filterByName = (event) => {
    setCurrentPage(1)
    setFilterName(event.target.value)
  }

  const filterByCategory = (event) => {
    setCurrentPage(1)
    setParentCategory(event.target.value)
  }

  const filterBySubCategory = (event) => {
    setCurrentPage(1)
    setSubCategory(event.target.value)
  }


  return (
    <section className="w-full">

      <Breadcrumb path={"Sub Sub Category"} link={'/category/sub-sub-category/view'} path2={"View"} slash={"/"} />

      <div className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form onSubmit={filterRecord} autoComplete='off' className="grid grid-cols-[20%__20%_35%_5%] gap-[1%] items-center ">
          <div className="">

            <select
              onChange={filterByCategory}
              name="parent_category_id"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Parent Category</option>
              {
                categories.map((v, i) => {
                  return (
                    <option value={v._id}>{v.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="">

            <select
              onChange={filterBySubCategory}
              name="sub_category_id"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Sub Category</option>
              {
                subCategories.map((v, i) => {
                  return (
                    <option value={v._id}>{v.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="">
            <input
              type="text"
              name='name'
              onKeyUp={filterByName}
              id="simple-search"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
              placeholder="Search  name..."
            />
          </div>
          <div className=''>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>

      </div>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Sub Category
            </h3>
            <div className='flex justify-between '>
              <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer text-[white] mx-3 rounded-[50%] w-[40px] h-[40px]  mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
              </div>

              <button onClick={changeStatus} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button>

              <button onClick={destroy} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete </button>

            </div>
          </div>
          <div className="border border-t-0 rounded-b-md border-slate-400">

            {/* border-2 border-[red] */}
            <div className="relative overflow-x-auto">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            checked={
                              subSubCategories.length > 0
                                ?
                                subSubCategories.length == checkBoxValues.length ? 'checked' : ''
                                :
                                ''

                            }
                            onClick={allCheckBox}
                            id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Parent Category Name
                      </th>
                      <th scope="col" class="px-0 py-3">
                        Sub Category Name
                      </th>
                      <th scope="col" class="px-0 py-3">
                        Sub Sub Category Name
                      </th>

                      <th scope="col" class=" w-[12%] ">
                        Image
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[10%]  ">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      subSubCategories.length > 0
                        ?
                        subSubCategories.map((item, key) => {
                          return (

                            <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td class="w-4 p-4">
                                <div class="flex items-center">
                                  <input
                                    onClick={() => singleCheckBox(item._id)}
                                    checked={checkBoxValues.includes(item._id) ? 'checked' : ''} id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <td class="px-6 py-3">
                                {
                                  item.parent_category_id.name
                                }
                              </td>
                              <td class="px-6 py-3">
                                {
                                  item.sub_category_id.name
                                }
                              </td>
                              <td>
                                {item.name}
                              </td>
                              <td class="py-4">
                                {
                                  item.image != ''
                                    ?
                                    <img class="w-10 h-10 rounded-full" src={`${imagePath}${item.image}`} alt="Jese image" />
                                    :
                                    'N/A'
                                }


                              </td>

                              <td class="px-6 py-4">
                                {item.order}
                              </td>
                              <td class=" py-4">
                                {
                                  item.status == true
                                    ?
                                    <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Active</button>
                                    :
                                    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">InActive</button>
                                }

                              </td>
                              <td class=" py-4">
                                <Link to={`/category/sub-sub-category/update/${item._id}`} >
                                  <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <MdModeEdit className='text-[18px]' />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          )
                        })

                        :

                        <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td class="px-6 py-4 text-center" colSpan={8}>
                            No Record Found !!
                          </td>
                        </tr>
                    }
                  </tbody>
                </table>

                <ResponsivePagination class="pb-3"
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>


            </div>

          </div>
        </div>
      </div>



    </section>
  )
}


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function AddColor() {
  // update work
  const [updateIdState, setUpdateIdState] = useState('')
  const [colorDetails, setColorDetails] = useState('');

  const navigate = useNavigate()

  let params = useParams()
  useEffect(() => {
    if (params.id != undefined) {
      setUpdateIdState(params.id)

      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_COLOR}/details/${params.id}`)
        .then((result) => {
          if (result.data._status == true) {
            setColorDetails(result.data._data)
          } else {
            setColorDetails('');
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

    const data = {
      name: event.target.name.value,
      code: event.target.code.value,
      order: event.target.order.value
    }

    if (params.id == undefined) {
      // Create Record API
      axios.post(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_COLOR}/create`, data)
        .then((result) => {
          if (result.data._status == true) {
            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });

            event.target.reset();
            navigate('/color/view')

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
      axios.put(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_COLOR}/update/${params.id}`, data)
        .then((result) => {
          if (result.data._status == true) {
            iziToast.success({
              title: 'Success',
              message: result.data._message,
              position: 'topRight',
            });

            event.target.reset();
            navigate('/color/view')

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
      <Breadcrumb path={"Color"} path2={updateIdState ? "Update" : "Add"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Color" : "Add Color"}
          </h3>
          <form onSubmit={handleSubmit} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">

            <div className="">
              <div className="mb-5">
                <label
                  htmlFor="Name"
                  className="block  text-md font-medium text-gray-900"
                >
                  Color Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="Name"
                  defaultValue={ colorDetails.name }
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Color Name"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="Name"
                  className="block  text-md font-medium text-gray-900"
                >
                  Color Code
                </label>
                <input
                  type="text"
                  name="code"
                  id="Name"
                  defaultValue={ colorDetails.code }
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Color Code"
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
                  defaultValue={ colorDetails.order }
                  id="order"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Order"
                />
              </div>
            </div>

            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Color" : "Add Color"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { toast } from 'react-toastify'
import { getDatabase, ref, set } from "firebase/database";
import app from '../config/firebase';

export default function AddQuiz() {

  const [isLoading, setIsLoading] = useState(0);

  const addQuizHandler = (event) => {
    event.preventDefault()

    setIsLoading(1);

    const quizData = {
      question : event.target.question.value,
      option_1 : event.target.option_1.value,
      option_2 : event.target.option_2.value,
      option_3 : event.target.option_3.value,
      option_4 : event.target.option_4.value,
      correct_answer : event.target.correct_answer.value
    }

    const db = getDatabase(app);
    set(ref(db, 'questions/' + Date.now()), quizData);

    console.log(quizData);

    event.target.reset();
    setIsLoading(0);
    toast.success('Question add Succussfully.');
  }


  return (
    <>
      <div className='text-center p-8 font-bold'>
        <h1>Add Quiz</h1>
      </div>

      <nav class="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <form onSubmit={ addQuizHandler }>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                <div className="col-span-full">
                  <label htmlFor="question" className="block text-sm/6 font-medium text-gray-900">
                    Question
                  </label>
                  <div className="mt-2">
                    <input
                      id="question"
                      name="question"
                      type="text"
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="option_1" className="block text-sm/6 font-medium text-gray-900">
                    Option 1
                  </label>
                  <div className="mt-2">
                    <input
                      id="option_1"
                      name="option_1"
                      type="text"
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                
                <div className="col-span-full">
                  <label htmlFor="option_2" className="block text-sm/6 font-medium text-gray-900">
                    Option 2
                  </label>
                  <div className="mt-2">
                    <input
                      id="option_2"
                      name="option_2"
                      type="text"
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="option_3" className="block text-sm/6 font-medium text-gray-900">
                    Option 3
                  </label>
                  <div className="mt-2">
                    <input
                      id="option_3"
                      name="option_3"
                      type="text"
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="option_4" className="block text-sm/6 font-medium text-gray-900">
                    Option 4
                  </label>
                  <div className="mt-2">
                    <input
                      id="option_4"
                      name="option_4"
                      type="text"
                      autoComplete="off"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                
                <div className="sm:col-span-4">
                  <label htmlFor="correct_answer" className="block text-sm/6 font-medium text-gray-900">
                    Correct Answer
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="correct_answer"
                      name="correct_answer"
                      autoComplete="off"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>Select Correct Answer</option>
                      <option value={`1`}>Option 1</option>
                      <option value={`2`}>Option 2</option>
                      <option value={`3`}>Option 3</option>
                      <option value={`4`}>Option 4</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>

                
              </div>
            </div>

            
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="reset" className="text-sm/6 font-semibold text-gray-900">
              Cancel
            </button>

            {
              isLoading
              ?
                <button type="button" class="inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400" disabled=""><svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing…</button>
              :
                <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
            }
            


            
          </div>
        </form>
      </div>
      </nav>
    </>
  )
}

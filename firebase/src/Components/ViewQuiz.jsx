import React, { useState } from 'react'

export default function ViewQuiz() {

  const [getQuizData, setQuizData] = useState([]);

  return (
    <>
      <div className='text-center p-8 font-bold'>
        <h1>View Quiz</h1>
      </div>

      <nav class="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="w-full flex flex-wrap items-center justify-between mx-auto p-4">


          <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    S.NO
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Question
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 1
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 2
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 3
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Option 4
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Correct Answer
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  getQuizData.length > 0
                  ?
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">
                    Silver
                  </td>
                  <td class="px-6 py-4">
                    Laptop
                  </td>
                  <td class="px-6 py-4">
                    $2999
                  </td>
                  <td class="px-6 py-4">
                    $2999
                  </td>
                  <td class="px-6 py-4">
                    $2999
                  </td>
                  <td class="px-6 py-4">
                    $2999
                  </td>
                </tr>
                :
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" colSpan={7} class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    No Record Found !!
                  </th>
                </tr>
                }
              </tbody>
            </table>
          </div>

        </div>
      </nav>
    </>
  )
}

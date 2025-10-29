import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../config/firebase';

export default function ViewQuiz() {

  const [getQuizData, setQuizData] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const questions = ref(db, 'questions');

    onValue(questions, (data) => {

      var ques = data.val();
      var allQuestion = [];

      for (var index in ques) {
        allQuestion.push(ques[index]);
      }

      setQuizData(allQuestion);
    });
  }, []);

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
                    getQuizData.map((v,i) => {
                      return (
                        <FetchQuestion data={ v } index={i}/>
                      )
                    })
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


function FetchQuestion({ data, index }) {

  if(data.correct_answer == 1){
    data.correct_answer  = data.option_1
  } else if(data.correct_answer == 2){
    data.correct_answer  = data.option_2
  } else if(data.correct_answer == 3){
    data.correct_answer  = data.option_3
  } else if(data.correct_answer == 4){
    data.correct_answer  = data.option_4
  }

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { index+1 }
      </th>
      <td class="px-6 py-4">
        { data.question }
      </td>
      <td class="px-6 py-4">
        { data.option_1 }
      </td>
      <td class="px-6 py-4">
        { data.option_2 }
      </td>
      <td class="px-6 py-4">
        { data.option_3 }
      </td>
      <td class="px-6 py-4">
        { data.option_4 }
      </td>
      <td class="px-6 py-4">
        { data.correct_answer }
      </td>
    </tr>
  )
}
import React, { useState } from 'react'
import data from './data';

export default function Accordian() {

    const [faqData, setFaqData] = useState(data);
    const [currentIndex, setCurrentIndex] = useState(0);

    const setIndexValue = (index) => {
        if(index == currentIndex){
            setCurrentIndex('i');
        } else {
            setCurrentIndex(index);
        }
        
    }

    return (
        <>
            <section class="faq">

                {
                    faqData.map((v,i) => {
                        return (
                            <div class="faqquestion" key={i}>
                                <div class="question" onClick={ () => setIndexValue(i) }  id="question1">
                                    {v.question}
                                    <span>{ currentIndex == i ? "-" : "+" }</span>
                                </div>
                                <div class={ currentIndex == i ? "answer" : "answer display" }    id="answer1">
                                    {v.answer}
                                </div>
                            </div>
                        )
                    })
                }

            </section>
        </>
    )
}

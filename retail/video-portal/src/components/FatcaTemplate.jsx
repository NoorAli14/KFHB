


import React from 'react'
import "../assets/scss/style.scss";



export const FatcaTemplate=({template})=>{
   const isFlag= template?.results?.sections;
    return (
        <div style={{width: "100%"}} >
            {isFlag  && template?.results?.sections.map(section=>{
                return (
                    <div className="c-row">
                          {section.questions.map(question=>{
                            return (
                                <div className="c-column">
                                    <strong>{question.title}</strong>
                                    <span>{question.answer ? question.answer :'N/A' }</span>
                                </div>
                            )
                          })}
                        
                    </div>
                )
            })}
            {!isFlag && (
                <div>
                    No template available
                </div>
            )}
        </div>
    )
}
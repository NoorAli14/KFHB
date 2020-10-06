


import React from 'react'
import "../assets/scss/style.scss";



export const FatcaTemplate=({template})=>{
   
    return (
        <div style={{width: "100%"}} >
            {template && template.results.sections.map(section=>{
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
            {!template && (
                <div>
                    No template available
                </div>
            )}
        </div>
    )
}
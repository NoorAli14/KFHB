


import React from 'react'

export const CRSTemplate=({template})=>{
  
    return (
        <div>
            <div className="crs-row">
                <div className="crs-th"> <strong>Country / Jurisdiction of tax residence</strong></div>
                <div className="crs-th"><strong>TIN</strong></div>
                <div className="crs-th"><strong>If no TIN available Tick the Reasons</strong></div>
                <div className="crs-th"><strong>Please explain in the following boxes why you are unable to obtain a TIN if you selected B above</strong></div>
            </div>
           {[1,2,3,4,5].map((item)=>{
               return (
                <div className="crs-row">
                    <div className="crs-td"> <input type="text" value={`field${item}`}/></div>
                    <div className="crs-td"> <input type="text" value={`field${item}`}/></div>
                    <div className="crs-td">
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                    </div>
                    <div className="crs-td"><input type="text" disabled={true} value={`field${item}`}/></div>
                 </div>
               )
           })}
        </div>
    )
}
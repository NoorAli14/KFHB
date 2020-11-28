import React from "react";

export const RemarksTab = () => {
  return (
    <div className="remakrs-container">
     <div className="remarks">
        <select name="" id="" style={{width:"100%", height:"30px"}}>
            <option value="accept">Accepted</option>
        </select>
        <br/>
        <textarea name="" id="" cols="30" rows="6" style={{width:"100%"}}></textarea>
        <br/>
        <button className="submit-btn" style={{height:'30px', width:'90px', marginRight:'5px'}}>Submit</button>
     </div>
    </div>
  );
};

import React, { useState } from "react";

export const RemarksTab = ({ onSubmit,customer }) => {
  const [remarks, setRemarks] = useState(customer?.remarks)
  const [status, setStatus] = useState(customer?.status);
  const remarksList = [
    { id: 'A', title: 'Approve' },
    { id: 'R', title: 'Reject' },
    { id: 'D', title: 'Dropped' },
    { id: 'RA', title: 'Reffer to Business' },
    { id: 'RT', title: 'Retry' }];
  function submit() {
    onSubmit({ status, remarks })
  }
  return (
    <div className="remakrs-container">
      <div className="remarks">
        <select value={status} onChange={e => { setStatus(e.target.value) }} style={{ width: "100%", height: "30px" }}>
          <option value="">Select status</option>
          {remarksList.map(item => {
            return (
              <option value={item.id}>{item.title}</option>
            )
          })}
        </select>
        <br />
        <textarea placeholder='Enter your remarks' value={remarks} onChange={e => { setRemarks(e.target.value) }} cols="30" rows="6" style={{ width: "100%" }}></textarea>
        <br />
        <button disabled={!status || !remarks} className="submit-btn" onClick={() => submit()} style={{ height: '30px', width: '90px', marginRight: '5px' }}>Submit</button>
      </div>
    </div>
  );
};

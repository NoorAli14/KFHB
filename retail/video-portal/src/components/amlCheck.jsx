import React from "react";

export const AMLCheck = ({ aml }) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="c-row">
        {aml && aml.map((item) => {
          return (
            <div className="c-column">
              <strong>Name Match:</strong>
              <span>{item.status ? item.status : "N/A"}</span>
            </div>
          );
        })}
      </div>
      {!aml && <div>AML not available</div>}
    </div>
  );
};

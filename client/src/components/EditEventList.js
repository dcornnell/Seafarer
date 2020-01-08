import React from "react";

function EditEventList({ children }) {
  return (
    <>
      <h3>Event List</h3>
      <div className="scroll">
        <ul>{children}</ul>
      </div>
    </>
  );
}

export default EditEventList;

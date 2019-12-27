import React from "react";

function Container({ children }) {
  console.log(children);
  return <div className="grid-container">{children}</div>;
}

export default Container;

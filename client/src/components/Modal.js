import React from "react";
import "./Modal.css";

function Modal({ status, children, onClick }) {
  return (
    <div className={status ? "show modal" : "hidden modal"}>
      <div className="modal-content">
        <button className="close-button" onClick={onClick}>
          x
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

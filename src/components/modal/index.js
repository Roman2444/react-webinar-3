import React from "react";
import "./style.css";

const Modal = ({ children, visible, setVisible }) => {

  return (
    <div
      onClick={() => setVisible(false)}
      className={`Modal ${visible ? " Modal--active" : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={'Modal-content'}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

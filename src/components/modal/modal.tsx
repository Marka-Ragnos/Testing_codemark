import React from "react";
import "./modal.scss";

type modalProps = {
  error: boolean;
  handleModalClose: Function;
};

const Modal: React.FC<modalProps> = ({ error, handleModalClose }) => {
  return (
    <div className={`${error ? "modal active" : "modal"}`}>
      <div className={`${error ? "modal__content active" : "modal"}`}>
        <h1>По тегу ничего не найдено</h1>
        <div className="modal__close" onClick={() => handleModalClose()}></div>
      </div>
    </div>
  );
};

export default Modal;

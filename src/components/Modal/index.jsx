import React, { useRef } from "react";
import styles from "./modal.module.scss";

const Modal = ({ open, onClose, children }) => {
  const ref = useRef(null);

  const close = (e) => {
    if (!ref.current.contains(e.target)) onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.modalContainer} onClick={close}>
      <div ref={ref} className={styles.modal}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

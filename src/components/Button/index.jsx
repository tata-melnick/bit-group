import React from "react";
import styles from "./button.module.scss";
import cn from "classnames";

const Button = ({ children, onClick, type, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn([
        styles.btn,
        { [styles.btnSuccess]: type === "success" },
        { [styles.btnError]: type === "error" },
        className,
      ])}
    >
      {children && children}
    </button>
  );
};

export default Button;

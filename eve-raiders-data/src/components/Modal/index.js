import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../inputs/Button";
import styles from "./Modal.module.scss";

const Context = React.createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </div>
  );
};

const Modal = ({
  onClose,
  onSubmit,
  closeLabel = "Close",
  submitLabel = "Submit",
  hideClose,
  hideSubmit,
  children,
  ...props
}) => {
  const modalNode = useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={styles.overlay}>
          <div className={styles.dialog} {...props}>
            {children}
            <div className={styles.buttons}>
              {!hideClose && (
                <Button className={styles.closeBtn} onClick={onClose}>
                  {closeLabel}
                </Button>
              )}
              {!hideSubmit && (
                <Button className={styles.submitBtn} onClick={onSubmit}>
                  {submitLabel}
                </Button>
              )}
            </div>
          </div>
        </div>,
        modalNode
      )
    : null;
};

export default Modal;

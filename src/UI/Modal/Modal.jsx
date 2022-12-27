import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={classes.modal}>
      <h3 className={classes["modal-title"]}>Product editing</h3>
      <div className={classes["modal-control"]}>
        <input type="text" className={classes["modal-input"]} />
      </div>
      <div className={classes["modal-buttons"]}>
        <button type="submit" className={classes["edit-btn"]}>
          accept
        </button>
        <button
          type="button"
          className={classes["cancel-btn"]}
          onClick={onClose}
        >
          cancel
        </button>
      </div>
    </div>
  );
};
const Modal = ({ onClose }) => {
  return (
    <>
      <Backdrop onClose={onClose} />;
      <ModalOverlay onClose={onClose} />
    </>
  );
};

export default Modal;

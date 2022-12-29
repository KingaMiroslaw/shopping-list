import { useEditListItemMutation } from "../../api/shopping-list-api/shopping-list-api";
import classes from "./Modal.module.css";
import { useState } from "react";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ onClose, editedItem, onRefetch, setAlert }) => {
  const [editListItem] = useEditListItemMutation();

  const [value, setValue] = useState(editedItem.productName);

  const editHandler = () => {
    editListItem({
      id: editedItem.id,
      body: {
        productName: value,
      },
    })
      .unwrap()
      .then(() => {
        onRefetch();
        onClose();
        setAlert({
          show: true,
          msg: "the product has been edited",
          type: "success",
        });
      });
  };

  return (
    <div className={classes.modal}>
      <h3 className={classes["modal-title"]}>Product editing</h3>
      <div className={classes["modal-control"]}>
        <input
          type="text"
          className={classes["modal-input"]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className={classes["modal-buttons"]}>
        <button
          type="submit"
          className={classes["edit-btn"]}
          onClick={() => editHandler()}
        >
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

const Modal = ({ onClose, editedItem, onRefetch, setAlert }) => {
  return (
    <>
      <Backdrop onClose={onClose} />;
      <ModalOverlay
        onClose={onClose}
        editedItem={editedItem}
        onRefetch={onRefetch}
        setAlert={setAlert}
      />
    </>
  );
};

export default Modal;

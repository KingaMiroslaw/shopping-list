import { useEditListItemMutation } from "../../api/shopping-list-api/shopping-list-api";
import classes from "./Modal.module.css";
import { useForm } from "react-hook-form";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ onClose, editedItem, onRefetch, setAlert }) => {
  const [editListItem] = useEditListItemMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { editedProductName: editedItem.productName },
  });

  const onSubmit = ({ editedProductName }) => {
    editListItem({
      id: editedItem.id,
      body: {
        productName: editedProductName,
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
    <main className={classes.modal}>
      <h3 className={classes["modal-title"]}>Product editing</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes["modal-control"]}>
          <input
            type="text"
            className={classes["modal-input"]}
            {...register("editedProductName", {
              required: "required value!",
              minLength: { value: 3, message: "minimal length is 3!" },
            })}
          />
        </div>
        <div className={classes["error-msg"]}>
          {errors?.editedProductName ? (
            <p>{errors.editedProductName.message}</p>
          ) : null}
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
      </form>
    </main>
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

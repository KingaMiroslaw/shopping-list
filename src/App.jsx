import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddListItemMutation,
  useGetListItemsQuery,
  useRemoveListItemMutation,
  useRemoveAllItemsMutation,
} from "./api/shopping-list-api/shopping-list-api";
import classes from "./App.module.css";
import Alert from "./components/Alert/Alert";
import List from "./components/List/List";
import Modal from "./UI/Modal/Modal";

function App() {
  const [isShown, setIsShown] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const { data = [], refetch } = useGetListItemsQuery();

  const [addListItem, result] = useAddListItemMutation();

  const [removeListItem] = useRemoveListItemMutation();

  const [removeAllItems] = useRemoveAllItemsMutation();

  const { register, handleSubmit, reset } = useForm();

  console.log(data); // do usunięcia

  const onSubmit = ({ productName }) => {
    addListItem({
      productName,
    })
      .unwrap()
      .then(() => {
        setAlert({
          show: true,
          msg: "product added to the list",
          type: "success",
        });
        refetch();
        reset();
      });
  };

  const onError = ({ productName }) => {
    setAlert({
      show: true,
      msg: productName.message,
      type: "danger",
    });
  };

  const removeHandler = (id) => {
    removeListItem(id).then(() => {
      setAlert({
        show: true,
        msg: "product removed from the list",
        type: "danger",
      });
      refetch();
    });
  };

  const removeAllProductsHandler = () => {
    removeAllItems().then(() => {
      setAlert({
        show: true,
        msg: "empty list",
        type: "danger",
      });
      refetch();
    });
  };

  const showModalHandler = () => {
    setIsShown(true);
  };

  const hideModalHandler = () => {
    setIsShown(false);
  };

  return (
    <>
      {isShown ? (
        <Modal
          onClose={hideModalHandler}
          editedItem={editedItem}
          onRefetch={refetch}
          setAlert={setAlert}
        />
      ) : null}
      <main className={classes.container}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {alert.show && <Alert {...alert} setAlert={setAlert} />}
          <h3 className={classes["form-header"]}>Shopping List</h3>
          <div className={classes["form-control"]}>
            <input
              className={classes["form-input"]}
              type="text"
              placeholder="e.g. eggs"
              {...register("productName", {
                required: "required value!",
                minLength: { value: 3, message: "minimal length is 3!" },
              })}
            />
            <button type="submit" className={classes["submit-btn"]}>
              submit
            </button>
          </div>
        </form>
        <div>
          <List
            listItems={data}
            removeItem={removeHandler}
            showModal={showModalHandler}
            setEditedItem={setEditedItem}
          />
        </div>
        <div className={classes["button-container"]}>
          <button
            type="submit"
            onClick={removeAllProductsHandler}
            className={classes["clear-btn"]}
          >
            Clear All
          </button>
        </div>
      </main>
    </>
  );
}

export default App;

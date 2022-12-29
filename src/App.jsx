import { useState } from "react";
import {
  useAddListItemMutation,
  useGetListItemsQuery,
  useRemoveListItemMutation,
  useRemoveAllItemsMutation,
} from "./api/shopping-list-api/shopping-list-api";
import classes from "./App.module.css";
import List from "./components/List/List";
import Modal from "./UI/Modal/Modal";

function App() {
  const [name, setName] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const { data = [], refetch } = useGetListItemsQuery();

  const [addListItem, result] = useAddListItemMutation();

  const [removeListItem] = useRemoveListItemMutation();

  const [removeAllItems] = useRemoveAllItemsMutation();

  console.log(data); // do usunięcia

  const addHandler = () => {
    addListItem({
      productName: name,
    })
      .unwrap()
      .then(() => {
        refetch();
        setName("");
      });
  };

  const removeHandler = (id) => {
    removeListItem(id).then(() => refetch());
  };

  const removeAllProductsHandler = () => {
    removeAllItems().then(() => refetch());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addHandler();
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
        />
      ) : null}
      <main className={classes.container}>
        <form onSubmit={submitHandler}>
          <h3 className={classes["form-header"]}>Shopping List</h3>
          <div className={classes["form-control"]}>
            <input
              type="text"
              placeholder="e.g. eggs"
              className={classes["form-input"]}
              value={name}
              onChange={(event) => setName(event.target.value)}
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

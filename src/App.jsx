import { useState } from "react";
import {
  useAddListItemMutation,
  useGetListItemsQuery,
  useRemoveListItemMutation,
  useRemoveAllItemsMutation,
} from "./api/shopping-list-api/shopping-list-api";
import classes from "./App.module.css";
import List from "./components/List/List";

function App() {
  const [name, setName] = useState("");

  const { data = [], refetch } = useGetListItemsQuery();

  const [addListItem, result] = useAddListItemMutation();

  const [removeListItem] = useRemoveListItemMutation();

  const [removeAllItems] = useRemoveAllItemsMutation();

  console.log(data); // do usunięcia

  const addHandler = async () => {
    await addListItem({
      productName: name,
    })
      .unwrap()
      .then(() => {
        refetch();
        setName("");
      });
  };

  const removeHandler = async (id) => {
    await removeListItem(id).then(() => refetch());
  };

  const removeAllProductsHandler = async () => {
    await removeAllItems().then(() => refetch());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addHandler();
  };

  return (
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
        <List listItems={data} removeItem={removeHandler} />
      </div>
      <div>
        <button type="submit" onClick={removeAllProductsHandler}>
          Clear All
        </button>
      </div>
    </main>
  );
}

export default App;

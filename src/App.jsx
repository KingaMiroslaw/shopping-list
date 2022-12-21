import { useState } from "react";
import {
  useAddListItemMutation,
  useGetListItemsQuery,
} from "./api/shopping-list-api/shopping-list-api";
import classes from "./App.module.css";

function App() {
  const [name, setName] = useState("");

  const { data = [], refetch } = useGetListItemsQuery();

  const [addListItem, result] = useAddListItemMutation();

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
        <ul>
          {data.map((item, id) => (
            <li key={id}>{item.productName}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;

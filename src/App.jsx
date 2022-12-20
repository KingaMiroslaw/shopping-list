import { useGetListItemsQuery } from "./api/shopping-list-api/shopping-list-api";
import classes from "./App.module.css";

function App() {
  const { data = [] } = useGetListItemsQuery();
  console.log(data); // do usunięcia

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
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
          />
          <button type="submit" className={classes["submit-btn"]}>
            submit
          </button>
        </div>
      </form>
      <div>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.productName}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;

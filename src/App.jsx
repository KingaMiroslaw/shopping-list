import { useGetListItemsQuery } from "./api/shopping-list-api/shopping-list-api";
import classes from "./App.module.css";

function App() {
  const { data = [] } = useGetListItemsQuery();
  console.log(data); // do usunięcia

  return (
    <main className={classes.container}>
      <div>Shopping list</div>
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

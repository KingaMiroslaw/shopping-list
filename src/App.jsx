import { useGetListItemsQuery } from "./api/shopping-list-api/shopping-list-api";

function App() {
  const { data = [] } = useGetListItemsQuery();

  console.log(data); // do usunięcia

  return (
    <div>
      <div>Shopping List</div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.productName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

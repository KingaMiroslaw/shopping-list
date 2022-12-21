import { RiEdit2Fill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";

const List = ({ listItems }) => {
  return (
    <div>
      {listItems.map((item) => {
        const { id, productName } = item;
        return (
          <article key={id}>
            <p>{productName}</p>
            <div>
              <button type="button">
                <RiEdit2Fill />
              </button>
              <button type="button">
                <IoTrashBinSharp />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;

import { RiEdit2Fill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import classes from "./List.module.css";


const List = ({ listItems }) => {
  return (
    <div>
      {listItems.map((item) => {
        const { id, productName } = item;
        return (
          <article key={id} className={classes["shopping-item"]}>
            <p className={classes["product-name"]}>{productName}</p>
            <div>
              <button type="button" className={classes["edit-btn"]}>
                <RiEdit2Fill className={classes.icon}/>
              </button>
              <button type="button" className={classes["delete-btn"]}>
                <IoTrashBinSharp className={classes.icon}/>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;

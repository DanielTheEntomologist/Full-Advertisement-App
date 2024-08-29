import React from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faCheckSquare,
  faCheck,
  faListCheck,
  faSquare,
  faSquareCheck,
  faSearch,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import styles from "./SearchCategories.module.scss";

import MultiselectDropdown from "../MultiSelectDropdown/MultiselectDropdown";

// import { getAll } from "../../../redux/categoriesRedux";

const SearchCategories = () => {
  // let categories = [];
  // categories = useSelector(getAll);

  const [categories, setCategories] = React.useState([
    { id: "Services", name: "Services", active: false },
    { id: "Jobs", name: "Jobs", active: false },
    { id: "Events", name: "Events", active: false },
    { id: "Products", name: "Products", active: false },
    { id: "Rentals", name: "Rentals", active: true },
    { id: "Real Estate", name: "Real Estate", active: true },
    { id: "Vehicles", name: "Vehicles", active: false },
    { id: "Other", name: "Other", active: false },
  ]);

  // const toogleCategory = () => {

  // const filterCategories = [];

  const filterCategories = categories
    .filter((category) => category.active)
    .map((category) => category.name);

  console.log(filterCategories);

  let categoryDisplay = filterCategories.join(", ");
  if (filterCategories.length === 0) {
    categoryDisplay = "Select categories";
  }

  return (
    <form action="" className={clsx(styles.root, "row py-2")}>
      <div
        className={clsx(
          styles.category,
          "col-12",
          "col-sm-6",
          "order-2",
          "order-sm-1",
          "p-0"
        )}
      >
        <MultiselectDropdown />
      </div>
      <div
        className={clsx(
          styles.searchField,
          "col-12",
          "col-sm-6",
          "order-1",
          "order-sm-2"
        )}
      >
        <input placeholder="Search products..." type="text" />
        <button>
          <FontAwesomeIcon className={styles.icon} icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

SearchCategories.propTypes = {
  children: PropTypes.node,
};

export default SearchCategories;

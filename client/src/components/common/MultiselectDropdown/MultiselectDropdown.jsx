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

import styles from "./MultiselectDropdown.module.scss";
// import { getAll } from "../../../redux/categoriesRedux";

const MultiselectDropdown = () => {
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

  const activeCategories = categories.filter((category) => category.active);

  let categoryDisplay = activeCategories;
  if (categoryDisplay.length === 0) {
    categoryDisplay = "Select categories";
  } else {
    categoryDisplay = activeCategories
      .map((cat) => [
        <span key={cat.id}>{cat.name}</span>,
        <span key={cat.id + " comma"}>, </span>,
      ])
      .flat() // flatten array [[a, b], [c, d]] => [a, b, c, d]
      .slice(0, -1); // remove last comma
  }

  return (
    <div className={clsx(styles.multiselect)}>
      <FontAwesomeIcon className={styles.icon} icon={faListUl} />
      <div
        className={clsx(
          styles.category_select,
          styles.category_display,
          styles.category_item
        )}
        name=""
        id=""
        onClick={() => {
          // remove last category from filterCategories
          if (activeCategories.length === 0) {
            return;
          }
          const poppedCategory = activeCategories.pop();

          const newCategories = categories.map((cat) =>
            cat.name === poppedCategory.name
              ? { ...cat, active: false }
              : { ...cat }
          );

          setCategories(newCategories);
        }}
      >
        {categoryDisplay}
      </div>
      <ul className={styles.category_dropdown}>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              // check if category is already selected

              let newCategories = [];

              newCategories = categories.map((cat) =>
                cat.id === category.id
                  ? { ...cat, active: !cat.active }
                  : { ...cat }
              );
              setCategories(newCategories);
            }}
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={category.active ? faCheckSquare : faSquare}
            />
            <div className={styles.category_item}>{category.name}</div>
          </li>
        ))}
      </ul>
      <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
    </div>
  );
};

MultiselectDropdown.propTypes = {
  children: PropTypes.node,
};

export default MultiselectDropdown;

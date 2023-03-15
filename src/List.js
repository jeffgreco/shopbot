import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { ListCategory, ListContainer } from "./styled-components";
import useList from "./useList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/sharp-solid-svg-icons";

const List = ({ showComplete, showItems = true, showEmptyCategories }) => {
  const { items, onEdit, checkItem, categoryOrder } = useList();
  const [collapsedCategories, setCollapsedCategories] = useState(() => {
    const storedCollapsedCategories = localStorage.getItem(
      "collapsedCategories"
    );
    return storedCollapsedCategories
      ? new Set(JSON.parse(storedCollapsedCategories))
      : new Set();
  });

  useEffect(() => {
    localStorage.setItem(
      "collapsedCategories",
      JSON.stringify([...collapsedCategories])
    );
  }, [collapsedCategories]);

  const filteredItems = items.filter((item) =>
    showComplete
      ? true
      : !item.checked || item.completedAt.toDate() > Date.now() - 90 * 1000
  );

  const categories = [...new Set(filteredItems.map((item) => item.category))];
  const finalCategoryOrder = categoryOrder
    .filter(
      (c) =>
        (showEmptyCategories ? true : categories.includes(c)) && c !== false
    )
    .concat(!showEmptyCategories && categories.includes(false) ? [false] : []);

  const toggleCategory = (category) => {
    const newCollapsedCategories = new Set(collapsedCategories);
    if (collapsedCategories.has(category)) {
      newCollapsedCategories.delete(category);
    } else {
      newCollapsedCategories.add(category);
    }
    setCollapsedCategories(newCollapsedCategories);
  };

  return (
    <ListContainer>
      {finalCategoryOrder.map((category, index) => (
        <React.Fragment key={category}>
          <ListCategory
            style={{
              justifyContent: "flex-start",
              cursor: "pointer",
              paddingLeft: 0,
            }}
            onClick={() => toggleCategory(category)}
          >
            {showItems && (
              <button
                style={{
                  background: "none",
                  border: "none",
                  width: 54,
                  margin: 0,
                  color: "var(--subhead-btn-color)",
                }}
              >
                <FontAwesomeIcon
                  fixedWidth
                  size="lg"
                  icon={collapsedCategories.has(category) ? faPlus : faMinus}
                />
              </button>
            )}
            <span>{category === false ? "Uncategorized" : category}</span>
          </ListCategory>
          {showItems &&
            !collapsedCategories.has(category) &&
            filteredItems
              .filter((item) => item.category === category)
              .map((item, index) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={index}
                  onEdit={onEdit}
                  onCheck={checkItem}
                />
              ))}
        </React.Fragment>
      ))}
    </ListContainer>
  );
};

export default List;

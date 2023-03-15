import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import useList from "./useList";

const ListContainer = styled.ul`
  list-style: none;
  padding: 0 0 24px;
`;

const ListCategory = styled.li`
  font-weight: bold;
  margin: 0;
  position: sticky;
  top: 40px;
  color: var(--subhead-text-color);
  background: var(--subhead-bg-color);
  padding: 0 5px;
  z-index: 400;
  display: flex;
  justify-content: space-between;
`;

const List = ({ showComplete, showItems = true, showEmptyCategories }) => {
  const { items, onEdit, checkItem, categoryOrder } = useList();
  const filteredItems = items.filter((item) =>
    showComplete
      ? true
      : !item.checked || item.completedAt.toDate() > Date.now() - 90 * 1000
  );

  console.log({ items });

  const categories = [...new Set(filteredItems.map((item) => item.category))];

  const finalCategoryOrder = categoryOrder
    .filter(
      (c) =>
        (showEmptyCategories ? true : categories.includes(c)) && c !== false
    )
    .concat(!showEmptyCategories && categories.includes(false) ? [false] : []);

  return (
    <ListContainer>
      {finalCategoryOrder.map((category, index) => (
        <React.Fragment key={category}>
          <ListCategory>
            <span>{category === false ? "Uncategorized" : category}</span>
          </ListCategory>
          {showItems &&
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

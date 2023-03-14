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
  background: #c6d8af;
  padding: 0 5px;
  z-index: 400;
  display: flex;
  justify-content: space-between;
`;

const arrayMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

const List = ({
  updateCategoryOrder,
  showComplete,
  uncategorizeItems,
  showItems = true,
  showEmptyCategories,
}) => {
  const { items, onEdit, onCheck, categoryOrder } = useList();
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
            {updateCategoryOrder && category !== false && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {index > 0 ? (
                  <button
                    className="secondary"
                    onClick={() => {
                      const newOrder = arrayMove(
                        categoryOrder,
                        index,
                        index - 1
                      );
                      updateCategoryOrder(newOrder);
                    }}
                  >
                    ⬆️
                  </button>
                ) : (
                  <div />
                )}
                <button
                  className="secondary"
                  onClick={async () => {
                    const newOrder = categoryOrder.filter(
                      (c) => c !== category
                    );
                    console.log({ categoryOrder, newOrder });
                    await uncategorizeItems(category);
                    await updateCategoryOrder(newOrder);
                  }}
                >
                  🗑️
                </button>
                {index !== finalCategoryOrder.length - 1 && (
                  <button
                    className="secondary"
                    onClick={() => {
                      const newOrder = arrayMove(
                        categoryOrder,
                        index,
                        index + 1
                      );
                      updateCategoryOrder(newOrder);
                    }}
                  >
                    ⬇️
                  </button>
                )}
              </div>
            )}
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
                  onCheck={onCheck}
                />
              ))}
        </React.Fragment>
      ))}
    </ListContainer>
  );
};

export default List;

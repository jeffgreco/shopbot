import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltDown,
  faArrowAltUp,
  faGripDotsVertical,
  faTrashAlt,
} from "@fortawesome/sharp-solid-svg-icons";
import React from "react";
import { ListCategory, ListContainer } from "./styled-components";
import useList from "./useList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const CategoryList = ({
  updateCategoryOrder,
  showComplete,
  uncategorizeItems,
  showEmptyCategories,
}) => {
  const { items, categoryOrder } = useList();
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newOrder = Array.from(categoryOrder);
    newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, result.draggableId);

    updateCategoryOrder(newOrder);
  };

  return (
    <ListContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ listStyle: "none", padding: "0 0 24px" }}
            >
              {finalCategoryOrder.map((category, index) => (
                <Draggable
                  key={category}
                  draggableId={category === false ? "uncategorized" : category}
                  index={index}
                >
                  {(provided) => (
                    <ListCategory
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>
                        <FontAwesomeIcon
                          className="grip"
                          icon={faGripDotsVertical}
                          fixedWidth
                        />
                        {category === false ? "Uncategorized" : category}
                      </span>
                      {updateCategoryOrder && category !== false && (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 4,
                            padding: 4,
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
                              <FontAwesomeIcon icon={faArrowAltUp} fixedWidth />
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
                            <FontAwesomeIcon icon={faTrashAlt} fixedWidth />
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
                              <FontAwesomeIcon
                                icon={faArrowAltDown}
                                fixedWidth
                              />
                            </button>
                          )}
                        </div>
                      )}
                    </ListCategory>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </ListContainer>
  );
};

export default CategoryList;

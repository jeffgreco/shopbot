import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useList from "./useList";

const CategoryMenuContainer = styled.div``;

const CategoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 16px;
  overflow-x: auto;
  white-space: nowrap;
`;

const CategoryListItem = styled.li`
  display: inline-block;
  margin-right: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    font-weight: bold;
    color: #007aff;
  }
`;

const CategoryInput = styled.input`
  display: block;
  width: 100%;
  height: 24px;
  padding: 8px;
  border: none;
  border-top: 1px solid #ddd;
  font-size: 14px;
  color: #333;

  &:focus {
    outline: none;
  }
`;

const CategoryMenu = ({ currentCategory, onSelect }) => {
  const { items } = useList();
  const categories = items.reduce((acc, item) => {
    if (!acc.includes(item.category) && item.category !== false) {
      acc.push(item.category);
    }
    return acc;
  }, []);
  console.log({ categories });
  const [customCategory, setCustomCategory] = useState("");

  const handleSelect = (category) => {
    onSelect(category);
  };

  const handleInputChange = (event) => {
    setCustomCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelect(customCategory.trim());
    setCustomCategory("");
  };

  return (
    <CategoryMenuContainer>
      <CategoryList>
        <CategoryListItem>Move to:</CategoryListItem>
        {categories.map((category) =>
          category !== currentCategory ? (
            <CategoryListItem
              key={category}
              onClick={() => handleSelect(category)}
            >
              <button>{category}</button>
            </CategoryListItem>
          ) : null
        )}
        <CategoryListItem>
          <form onSubmit={handleSubmit}>
            <CategoryInput
              type="text"
              placeholder="Add a custom category"
              value={customCategory}
              onChange={handleInputChange}
            />
          </form>
        </CategoryListItem>
      </CategoryList>
    </CategoryMenuContainer>
  );
};

export default CategoryMenu;

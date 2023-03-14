import React, { useState } from "react";
import styled from "styled-components";
import useList from "./useList";

const StyledForm = styled.form`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px 20px;
  z-index: 1000;
  background-color: var(--header-bg-color);
  gap: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  justify-content: space-around;
`;

const Input = styled.input`
  flex-grow: 1;
  // margin-right: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 6px;
  padding: 6px;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  box-sizing: border-box;
`;

const AddCategory = () => {
  const { categoryOrder, updateCategoryOrder } = useList();
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setText("");
    updateCategoryOrder([...categoryOrder, text]);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new category"
      />
      <Button type="submit" className="secondary">
        Add
      </Button>
    </StyledForm>
  );
};

export default AddCategory;

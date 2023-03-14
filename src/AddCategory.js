import React, { useState } from "react";
import { AddInput, StyledForm, SubmitButton } from "./styled-components";
import useList from "./useList";

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
      <AddInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new category"
      />
      <SubmitButton type="submit" className="secondary">
        Add
      </SubmitButton>
    </StyledForm>
  );
};

export default AddCategory;

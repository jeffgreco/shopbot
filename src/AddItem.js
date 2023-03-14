import React, { useState } from "react";
import { AddInput, StyledForm, SubmitButton } from "./styled-components";

const AddItem = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      Add
      <AddInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new item"
      />
      <SubmitButton type="submit" className="secondary">
        Add
      </SubmitButton>
    </StyledForm>
  );
};

export default AddItem;

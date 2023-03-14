import styled from "styled-components";

export const StyledListItem = styled.li`
  .item {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    font-size: 1rem;
    padding: 5px 10px;
  }
  form {
    flex-grow: 1;
  }
  border-bottom: 1px solid #ccc;
  .buttons {
    display: flex;
    gap: 8px;
    font-weight: bold;
  }
`;

export const CheckButton = styled.button`
  width: 32px;
  overflow: hidden;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 100%;
  color: white;
  background-color: ${({ checked }) => (checked ? "#7bc47f" : "transparent")};
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;
  display: flex;
  padding: 0;
`;

export const Input = styled.input`
  background: transparent;
  flex-grow: 1;
  margin-right: 10px;
  font-size: 1rem;
  width: 100%;
  color: ${({ checked }) => (checked ? "#aaa" : "inherit")};
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  border: none;
  &:focus {
    outline: none;
  }
`;

export const DeleteButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  color: #f44336;
  transition: color 0.2s ease-out;
  flex: 0 0 auto;

  &:focus {
    outline: none;
  }
`;

export const AddButton = styled.button`
  background-color: #0f0;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-right: 10px;
  cursor: pointer;
`;

export const AddForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const AddInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333;
  }
`;

export const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItemWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

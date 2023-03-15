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
  border-bottom: 1px solid var(--list-divider-color);
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
  border: 1px solid var(--checkbox-border-color);
  border-radius: 100%;
  color: white;
  background-color: ${({ checked }) =>
    checked ? "var(--primary-btn-bg-color)" : "transparent"};
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

export const StyledForm = styled.form`
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

export const AddInput = styled.input`
  flex-grow: 1;
  // margin-right: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 6px;
  padding: 6px;
`;

export const SubmitButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  box-sizing: border-box;
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0 0 24px;
`;

export const ListCategory = styled.li`
  font-weight: bold;
  margin: 0;
  position: sticky;
  top: 40px;
  color: var(--subhead-text-color);
  background: var(--subhead-bg-color);
  padding: 4px 5px;
  z-index: 400;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

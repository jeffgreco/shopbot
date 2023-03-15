import React, { useState } from "react";
import { StyledListItem, CheckButton, Input } from "./styled-components";
import CategoryMenu from "./CategoryMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEllipsisV } from "@fortawesome/sharp-solid-svg-icons";

const ListItem = ({ item, onEdit, onCheck }) => {
  const [text, setText] = useState(item.text);
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    if (item.text !== text) {
      onEdit(item.id, text);
    }
  };

  const handleCheck = () => {
    if (item.checked) {
      onCheck(item.id, false);
    } else {
      onCheck(item.id, true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEdit();
    }
  };

  const handleCategoryChange = (category) => {
    onEdit(item.id, text, category);

    setShowMenu(false);
  };

  return (
    <StyledListItem>
      <div className="item">
        <CheckButton checked={item.checked} onClick={handleCheck}>
          {item.checked ? <FontAwesomeIcon icon={faCheck} size="lg" /> : ""}
        </CheckButton>
        <form onSubmit={handleEdit}>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            checked={item.checked}
          />
        </form>
        <div className="buttons">
          <button className="tertiary" onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon icon={faEllipsisV} size="lg" />
          </button>
        </div>
      </div>
      {showMenu && (
        <CategoryMenu
          category={item.category}
          onSelect={handleCategoryChange}
        />
      )}
    </StyledListItem>
  );
};

export default ListItem;

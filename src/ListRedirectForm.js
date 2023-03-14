import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListRedirectForm = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/list/${inputValue}`);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      <label>
        Enter your list ID:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <button className="primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ListRedirectForm;

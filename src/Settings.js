import useList from "./useList";

const Settings = (props) => {
  const { updateListDataValue, listData } = useList();

  if (!listData) return <div>Loading...</div>;
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>What categories should GPT pick from?</label>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className={`primary ${
              listData.useUserCategories !== true ? "active" : "inactive"
            }`}
            onClick={() => updateListDataValue("useUserCategories", false)}
          >
            Any GPT suggestion
          </button>
          <button
            className={`primary ${
              listData.useUserCategories === true ? "active" : "inactive"
            }`}
            onClick={() => updateListDataValue("useUserCategories", true)}
          >
            Existing categories only
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

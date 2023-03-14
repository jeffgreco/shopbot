import React from "react";
import styled from "styled-components";
import useList from "./useList";
import List from "./List";
import AddItem from "./AddItem";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import AddCategory from "./AddCategory";
import Settings from "./Settings";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Navigation = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: var(--header-bg-color);
  color: var(--header-text-color);
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  right: 0;

  div {
    display: flex;
  }
`;

const NavigationItem = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#a7d8a6" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
`;

const ListPage = () => {
  const {
    items,
    categoryOrder,
    addItem,
    editItem,
    checkItem,
    deleteItem,
    updateCategoryOrder,
    uncategorizeItems,
  } = useList();
  const [activeTab, setActiveTab] = React.useState("list");
  const navItems = [
    { name: "List", activeTab: "list" },
    { name: "Archive", activeTab: "archive" },
    { name: "Categories", activeTab: "categories" },
    { name: "Settings", activeTab: "settings" },
  ];

  return (
    <Container>
      <ToastContainer position={"top-center"} autoClose={4000} />
      <Navigation>
        <div>ShopBot</div>
        <div>
          {navItems.map((navItem) => (
            <NavigationItem
              key={navItem.activeTab}
              active={activeTab === navItem.activeTab}
              onClick={() => setActiveTab(navItem.activeTab)}
              className="secondary"
            >
              {navItem.name}
            </NavigationItem>
          ))}
        </div>
      </Navigation>
      {activeTab === "list" && (
        <>
          <AddItem onAdd={addItem} />
          <List showComplete={false} />
        </>
      )}
      {activeTab === "archive" && <List showComplete={true} />}
      {activeTab === "categories" && (
        <>
          <AddCategory />
          <List
            showComplete={true}
            showItems={false}
            updateCategoryOrder={updateCategoryOrder}
            uncategorizeItems={uncategorizeItems}
            showEmptyCategories={true}
          />
        </>
      )}
      {activeTab === "settings" && <Settings />}
    </Container>
  );
};

export default ListPage;

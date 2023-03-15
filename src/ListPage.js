import React from "react";
import styled from "styled-components";
import useList from "./useList";
import List from "./List";
import AddItem from "./AddItem";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddCategory from "./AddCategory";
import Settings from "./Settings";
import CategoryList from "./CategoryList";
import { Outlet, NavLink, Route, Routes } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Navigation = styled.header`
  font-weight: 400;
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

const NavigationItem = styled(NavLink)`
  padding: 0 10px;
  background-color: transparent;
  color: #fff;
  border: 0;
  // height: 40px;
  font-size: 14px;
  border-bottom: 4px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 4px solid transparent;
  height: fill-available;
  text-decoration: none;

  &.active {
    border-top: 4px solid var(--header-text-color);
  }
`;

const ListPage = () => {
  const { addItem, updateCategoryOrder, uncategorizeItems } = useList();

  return (
    <Container>
      <ToastContainer position={"top-center"} autoClose={4000} />
      <Navigation>
        <div>
          <img
            src="/cart-shopping-fast-solid.svg"
            width={24}
            alt=""
            style={{ marginRight: 8 }}
          />
        </div>
        <div style={{ height: "100%" }}>
          <NavigationItem to="" end>
            List
          </NavigationItem>
          <NavigationItem to="archive">Archive</NavigationItem>
          <NavigationItem to="categories">Categories</NavigationItem>
          <NavigationItem to="settings">Settings</NavigationItem>
        </div>
      </Navigation>
      <Outlet />
      <Routes>
        <Route
          path=""
          element={
            <>
              <AddItem onAdd={addItem} />
              <List showComplete={false} />
            </>
          }
        />
        <Route path="archive" element={<List showComplete={true} />} />
        <Route
          path="categories"
          element={
            <>
              <AddCategory />
              <CategoryList
                showComplete={true}
                showItems={false}
                updateCategoryOrder={updateCategoryOrder}
                uncategorizeItems={uncategorizeItems}
                showEmptyCategories={true}
              />
            </>
          }
        />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </Container>
  );
};

export default ListPage;

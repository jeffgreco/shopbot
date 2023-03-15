import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { getFunctions, httpsCallableFromURL } from "firebase/functions";
import { useParams } from "react-router-dom";

const functions = getFunctions();
const callFetchCategory = httpsCallableFromURL(
  functions,
  "https://generatecategory-7tkwx2npeq-uc.a.run.app/generatecategory"
);

const useList = () => {
  const params = useParams();
  const { listId } = params;

  const fetchCategory = (text, categoryOrder) => {
    return callFetchCategory({ text, categoryOrder }).then((result) => {
      console.log(result.data);
      return result.data;
    });
  };

  const [items, ,] = useCollectionData(
    collection(db, "lists", listId, "items"),
    { idField: "id" }
  );
  const [listData, ,] = useDocumentData(doc(db, "lists", listId));

  const allCategories = items
    ? [...new Set(items.map((item) => item.category))]
    : [];
  const storedCategoryOrder = listData?.categoryOrder || [];
  console.log({ storedCategoryOrder, allCategories });
  const categoryOrder = [
    ...storedCategoryOrder,
    ...allCategories.filter((cat) => !storedCategoryOrder.includes(cat)),
  ].filter((cat) => cat !== false);

  const updateCategoryOrder = async (newOrder) => {
    await setDoc(
      doc(db, "lists", listId),
      { categoryOrder: newOrder },
      { merge: true }
    );
  };

  const addItem = async (text) => {
    const id = uuidv4();
    const timestamp = new Date().getTime();
    const category = listData?.useUserCategories
      ? await fetchCategory(text, categoryOrder)
      : await fetchCategory(text);
    const item = {
      id,
      text,
      category,
      checked: false,
      timestamp,
    };
    await setDoc(doc(db, `lists/${listId}/items`, id), item);
    toast.info(
      <div>
        <strong>{text}</strong> added to {category}
      </div>
    );
  };

  const editItem = async (itemId, text, manualCategory = false) => {
    console.log("editing item", { itemId, text, manualCategory });
    const itemIndex = items.findIndex((item) => item.id === itemId);
    const newItems = [...items];
    const category =
      manualCategory ||
      items[itemIndex].manualCategory ||
      (listData.useUserCategories
        ? await fetchCategory(text, categoryOrder)
        : await fetchCategory(text));
    const item = {
      ...newItems[itemIndex],
      text,
      category,
    };
    if (manualCategory) {
      item.manualCategory = manualCategory;
    }
    await updateDoc(doc(db, "lists", listId, "items", item.id), item);
  };

  const checkItem = async (itemId, checked) => {
    const itemIndex = items.findIndex((item) => item.id === itemId);
    const newItems = [...items];
    newItems[itemIndex] = {
      ...newItems[itemIndex],
      checked,
      completedAt: new Date(),
    };
    await updateDoc(
      doc(db, "lists", listId, "items", newItems[itemIndex].id),
      newItems[itemIndex]
    );
  };

  const deleteItem = async (itemId) => {
    const itemIndex = items.findIndex((item) => item.id === itemId);
    const newItems = [...items];
    newItems.splice(itemIndex, 1);
    await deleteDoc(doc(db, "lists", listId, "items", itemId));
  };

  const uncategorizeItems = async (category) => {
    const uncategorizedItems =
      items &&
      items
        .filter((item) => item.category === category)
        .map((item) => ({
          ...item,
          category: false,
        }));
    console.log(uncategorizedItems);
    const batch = writeBatch(db);
    uncategorizedItems.forEach((item) => {
      batch.update(doc(db, "lists", listId, "items", item.id), item);
    });
    await batch.commit();
  };

  const updateListDataValue = async (key, value) => {
    await updateDoc(doc(db, "lists", listId), { [key]: value });
  };

  return {
    items: items
      ? items.sort((a, b) => {
          if (a.checked && !b.checked) {
            return 1;
          } else if (!a.checked && b.checked) {
            return -1;
          } else {
            return a.text.localeCompare(b.text);
          }
        })
      : [],
    listData,
    categoryOrder,
    addItem,
    editItem,
    checkItem,
    deleteItem,
    updateCategoryOrder,
    uncategorizeItems,
    updateListDataValue,
  };
};

export default useList;

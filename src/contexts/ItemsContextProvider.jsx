/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import { INITIAL_ITEMS } from "../lib/constants";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || INITIAL_ITEMS,
  );

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: Date.now(),
      name: newItemText,
      packed: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          packed: !item.packed,
        };
      }

      return item;
    });

    setItems(newItems);
  };

  const handleMarkAllAsComplete = () => {
    const newItems = items.map((item) => ({
      ...item,
      packed: true,
    }));

    setItems(newItems);
  };

  const handleMarkAllAsIncomplete = () => {
    const newItems = items.map((item) => ({
      ...item,
      packed: false,
    }));

    setItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToInitial = () => {
    setItems(INITIAL_ITEMS);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleToggleItem,
        handleMarkAllAsComplete,
        handleMarkAllAsIncomplete,
        handleRemoveAllItems,
        handleResetToInitial,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

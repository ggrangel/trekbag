/* eslint-disable react/prop-types */
import Button from "./Button";
import { useRef, useState } from "react";
import { useItemStore } from "../stores/itemsStore";

export default function AddItemForm() {
  const [itemText, setItemText] = useState();
  const inputRef = useRef();
  const addItem = useItemStore((state) => state.addItem);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemText) {
      alert("Item can't be empty");
      inputRef.current.focus();
      return;
    }

    addItem(itemText);
    setItemText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={(e) => {
          setItemText(e.target.value);
        }}
        autoFocus
      />
      <Button>Add to list</Button>
    </form>
  );
}

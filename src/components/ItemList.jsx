import EmptyView from "./EmptyView";
import Select from "react-select";
import { useState, useMemo } from "react";
import { useItemStore } from "../stores/itemsStore";

const sortingOptions = [
  {
    label: "Sort by default",
    value: "default",
  },
  {
    label: "Sort by packed",
    value: "packed",
  },
  {
    label: "Sort by unpacked",
    value: "unpacked",
  },
];

/* eslint-disable react/prop-types */
export default function ItemList() {
  const [sortBy, setSortBy] = useState(sortingOptions[0].value);
  const items = useItemStore((state) => state.items);
  const deleteItem = useItemStore((state) => state.deleteItem);
  const toggleItem = useItemStore((state) => state.toggleItem);

  // useMemo makes sure we only sort the items again if we really need to
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return b.packed - a.packed;
        } else if (sortBy === "unpacked") {
          return a.packed - b.packed;
        }
        return a.id - b.id;
      }),
    [items, sortBy],
  );

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 && (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      )}

      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDeleteItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onToggleItem(item.id)}
          type="checkbox"
          checked={item.packed}
        />
        {item.name}
      </label>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

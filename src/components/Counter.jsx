import { useItemStore } from "../stores/itemsStore";

export default function Counter() {
  const items = useItemStore((state) => state.items);
  return (
    <p>
      <b>{items.filter((i) => i.packed).length}</b> / {items.length} items
      packed
    </p>
  );
}

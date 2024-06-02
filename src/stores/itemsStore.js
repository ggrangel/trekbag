import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_ITEMS } from "../lib/constants";

export const useItemStore = create(
  persist(
    (set) => ({
      items: INITIAL_ITEMS,
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToInitial: () => {
        set(() => ({ items: INITIAL_ITEMS }));
      },
      addItem: (newItemText) => {
        set((state) => {
          const newItem = {
            id: Date.now(),
            name: newItemText,
            packed: false,
          };

          return { items: [...state.items, newItem] };
        });
      },
      deleteItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { items: newItems };
        });
      },
      markAllAsComplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: true,
          }));

          return { items: newItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: false,
          }));

          return { items: newItems };
        });
      },
      toggleItem: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                packed: !item.packed,
              };
            }

            return item;
          });

          return { items: newItems };
        });
      },
    }),
    {
      name: "items",
    },
  ),
);

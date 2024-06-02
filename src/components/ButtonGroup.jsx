/* eslint-disable react/prop-types */
import Button from "./Button";
import { useItemStore } from "../stores/itemsStore";

export default function ButtonGroup() {
  const markAllAsComplete = useItemStore((state) => state.markAllAsComplete);
  const markAllAsIncomplete = useItemStore(
    (state) => state.markAllAsIncomplete,
  );
  const resetToInitial = useItemStore((state) => state.resetToInitial);
  const removeAllItems = useItemStore((state) => state.removeAllItems);

  const secondaryButtons = [
    {
      text: "Mark all as complete",
      onClick: markAllAsComplete,
    },
    {
      text: "Mark all as incomplete",
      onClick: markAllAsIncomplete,
    },
    {
      text: "Reset to initial",
      onClick: resetToInitial,
    },
    {
      text: "Remove all items",
      onClick: removeAllItems,
    },
  ];

  return (
    <section className="button-group">
      {secondaryButtons.map((button) => (
        <Button
          key={button.text + button.onClick.toString()}
          onClick={button.onClick}
          buttonType="secondary"
        >
          {button.text}
        </Button>
      ))}
    </section>
  );
}

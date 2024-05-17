import { useState } from "react";
import { tasks } from "./data";

import classes from "./App.module.css";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const App = () => {
  const [items, setItems] = useState(tasks);
  const [activeItem, setActiveItem] = useState(null);

  const onDragStartHandler = (event) => {
    const { active } = event;
    if (!active) {
      return;
    }
    const sourceIndex = items.findIndex(({ id }) => id === active.id);

    setActiveItem(items[sourceIndex]);

    updateStyles(active.id);
  };

  const onDragMoveHandler = (event) => {
    if (!activeItem) {
      return;
    }

    const item = document.getElementById(activeItem.id);
    item.style.backgroundColor = "#eee";
  };

  const onDragCancelHandler = (event) => {
    const { active } = event;

    if (!active) {
      return;
    }

    setActiveItem(null);
    resetStyles(active.id);
  };

  const onDragEndHandler = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    const newTaskIds = Array.from(items);
    const sourceIndex = items.findIndex(({ id }) => id === active.id);
    const destinationIndex = items.findIndex(({ id }) => id === over.id);
    newTaskIds.splice(sourceIndex, 1);
    newTaskIds.splice(destinationIndex, 0, items[sourceIndex]);

    setItems(newTaskIds);
    setActiveItem(null);

    resetStyles(active.id);
  };

  const updateStyles = (itemId) => {
    const item = document.getElementById(itemId);
    item.style.backgroundColor = "lightgreen";
    item.style.zIndex = "99999";
  };

  const resetStyles = (itemId) => {
    const item = document.getElementById(itemId);
    item.style.zIndex = "0";
  };

  return (
    <DndContext
      onDragStart={onDragStartHandler}
      onDragMove={onDragMoveHandler}
      onDragCancel={onDragCancelHandler}
      onDragEnd={onDragEndHandler}
    >
      <SortableContext items={items}>
        <div className={classes.list}>
          {items.map((task) => (
            <SortableItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default App;

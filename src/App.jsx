import { useState } from "react";
import { tasks } from "./data";

import classes from "./App.module.css";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const App = () => {
  const [items, setItems] = useState(tasks);
  const [active, setActive] = useState(null);

  const onDragStartHandler = (event) => {
    const { active } = event;
    const sourceIndex = items.findIndex(({ id }) => id === active.id);

    setActive(items[sourceIndex]);

    const item = document.getElementById(active.id);
    item.style.backgroundColor = "lightgreen";
  };

  const onDragMoveHandler = (event) => {
    if (!active) {
      return;
    }

    const item = document.getElementById(active.id);
    item.style.backgroundColor = "#eee";
  };

  const onDragCancelHandler = (event) => {
    setActive(null);
  };

  const onDragEndHandler = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const sourceId = active.id;
    const destinationId = over.id;
    if (sourceId === destinationId) {
      return;
    }

    const newTaskIds = Array.from(items);
    const sourceIndex = items.findIndex(({ id }) => id === active.id);
    const destinationIndex = items.findIndex(({ id }) => id === over.id);
    newTaskIds.splice(sourceIndex, 1);
    newTaskIds.splice(destinationIndex, 0, items[sourceIndex]);

    setItems(newTaskIds);
    setActive(null);
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

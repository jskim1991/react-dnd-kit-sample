import { useSortable } from "@dnd-kit/sortable";

import classes from "./SortableItem.module.css";
import SampleChart from "./SampleChart";

const SortableItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: `${transition}`,
      }
    : undefined;

  return (
    <div
      id={task.id}
      className={classes.container}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h3>{task.content}</h3>
      <div className={classes.chart}>
        <SampleChart numbers={task.numbers} targets={task.targets} />
      </div>
    </div>
  );
};

export default SortableItem;

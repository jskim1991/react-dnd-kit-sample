import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ disabled, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
    disabled: disabled,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;

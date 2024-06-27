import { FC } from "react";
import { container, description, title } from "./Task.css";
import { Draggable } from "react-beautiful-dnd";

type TTaskProps = {
  taskName: string;
  taskDescription: string;
  boardId: string;
  id: string;
  index: number;
};

const Task: FC<TTaskProps> = ({
  taskName,
  taskDescription,
  // boardId,
  id,
  index,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;

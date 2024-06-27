import { FC } from "react";
import { IList, ITask } from "../../types";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { useTypedDispatch } from "../../hooks/redux";
import { removeList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";
import { Droppable } from "react-beautiful-dnd";

type TListProps = {
  list: IList;
  boardId: string;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();
  const listDeleteHandelr = (listId: string) => {
    dispatch(
      removeList({
        boardId,
        listId,
      })
    );

    dispatch(
      addLog({
        logAuthor: "kdman",
        logId: v4(),
        logMessage: `리스트 삭제하기 : ${list.listName}`,
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div
          className={listWrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract
              className={deleteButton}
              onClick={() => listDeleteHandelr(list.listId)}
            />
          </div>
          {list.tasks.map((task, idx) => (
            <div
              key={task.taskId}
              onClick={() => handleTaskChange(boardId, list.listId, task)}
            >
              <Task
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                boardId={boardId}
                id={task.taskId}
                index={idx}
              />
            </div>
          ))}
          {provided.placeholder}
          <ActionButton
            boardId={boardId}
            listId={list.listId}
            activeLists={false}
          />
        </div>
      )}
    </Droppable>
  );
};

export default List;

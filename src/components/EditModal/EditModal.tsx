import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { ChangeEvent, useState } from "react";
import {
  removeTask,
  setModalActive,
  updateTask,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from "./EditModal.css";

const EditModal = () => {
  const editState = useTypedSelector((state) => state.modal);
  const dispatch = useTypedDispatch();
  const [data, setData] = useState(editState);

  const changeDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setData((prevState) => {
      return {
        ...prevState,
        task: {
          ...prevState.task,
          [name]: e.target.value,
        },
      };
    });
  };

  const closeButtonHandler = () => {
    dispatch(setModalActive(false));
  };

  const updateTaskHandler = () => {
    dispatch(
      updateTask({
        boardId: editState.boardId,
        listId: editState.listId,
        task: data.task,
      })
    );

    dispatch(
      addLog({
        logAuthor: "kdman",
        logId: v4(),
        logMessage: `일을 업데이트 : ${editState.task.taskName}`,
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  const removeTaskHandler = () => {
    dispatch(
      removeTask({
        boardId: editState.boardId,
        listId: editState.listId,
        taskId: editState.task.taskId,
      })
    );

    dispatch(
      addLog({
        logAuthor: "kdman",
        logId: v4(),
        logMessage: `일을 삭제 : ${editState.task.taskName}`,
        logTimestamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editState.task.taskName}</div>
          <FiX onClick={closeButtonHandler} className={closeButton} />
        </div>
        <div className={title}>제목</div>
        <input
          className={input}
          type="text"
          value={data.task.taskName}
          name="taskName"
          onChange={changeDataHandler}
        />
        <div className={title}>설명</div>
        <input
          className={input}
          type="text"
          value={data.task.taskDescription}
          name="taskDescription"
          onChange={changeDataHandler}
        />
        <div className={title}>생성한 사람</div>
        <input
          className={input}
          type="text"
          value={data.task.taskOwner}
          name="taskOwner"
          onChange={changeDataHandler}
        />
        <div className={buttons}>
          <button className={updateButton} onClick={updateTaskHandler}>
            일 수정하기
          </button>
          <button className={deleteButton} onClick={removeTaskHandler}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

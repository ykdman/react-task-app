import React, { FC, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import {
  button,
  buttons,
  close,
  input,
  listForm,
  taskForm,
} from "./DropdownForm.css";

type TDropdownFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: boolean;
  boardId: string;
  listId: string;
};

const DropdownForm: FC<TDropdownFormProps> = ({
  boardId,
  list,
  listId,
  setIsFormOpen,
}) => {
  const [text, setText] = useState("");
  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const formPlaceHolder: string = list
    ? "리스트의 제목을 입력하세요"
    : "일의 제목을 입력하세요";

  const buttonTitle: string = list ? "리스트 추가하기" : "일 추가하기";

  const dispatch = useTypedDispatch();

  const clickActionButtonHandler = (boardId: string, listId: string) => {
    if (!text) {
      return;
    }

    if (list) {
      // 새로운 리스트 생성
      dispatch(
        addList({
          boardId,
          list: {
            listId: v4(),
            listName: text,
            tasks: [],
          },
        })
      );

      dispatch(
        addLog({
          logAuthor: "kdman",
          logId: v4(),
          logMessage: `리스트 추가 : ${text}`,
          logTimestamp: String(Date.now()),
        })
      );
    } else {
      // 리스트 안에 새로운 task 생성
      dispatch(
        addTask({
          boardId,
          listId,
          task: {
            taskId: v4(),
            taskName: text,
            taskDescription: "",
            taskOwner: "kdman",
          },
        })
      );
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `일 생성하기 : ${text}`,
          logAuthor: "kdman",
          logTimestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        autoFocus
        placeholder={formPlaceHolder}
        value={text}
        onChange={textChangeHandler}
        onBlur={() => setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button
          className={button}
          onMouseDown={() => clickActionButtonHandler(boardId, listId)}
        >
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropdownForm;

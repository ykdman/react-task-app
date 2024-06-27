import { FC, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  toggleFormOpen: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const SideForm: FC<TSideFormProps> = ({ toggleFormOpen, inputRef }) => {
  const [inputText, setInputText] = useState<string>("");
  const dispatch = useTypedDispatch();
  const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const addBoardHandler = () => {
    if (!inputText) {
      return;
    }
    dispatch(
      addBoard({
        board: {
          boardId: uuidv4(),
          boardName: inputText,
          lists: [],
        },
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `게시판 등록 : ${inputText}`,
        logAuthor: "kdman",
        logTimestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={inputTextHandler}
        onBlur={toggleFormOpen}
        ref={inputRef}
      />
      <FiCheck className={icon} onMouseDown={addBoardHandler} />
    </div>
  );
};

export default SideForm;

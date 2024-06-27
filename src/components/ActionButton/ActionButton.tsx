import { FC, useState } from "react";
import DropdownForm from "./DropdownForm/DropdownForm";
import { IoIosAdd } from "react-icons/io";
import { listbutton, taskButton } from "./ActionButton.css";

type TActionButtonProps = {
  boardId: string;
  listId: string;
  activeLists: boolean;
};

const ActionButton: FC<TActionButtonProps> = ({
  boardId,
  listId,
  activeLists,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const buttonText = activeLists ? "새로운 리스트 등록" : "새로운 일 등록";

  return isFormOpen ? (
    <DropdownForm
      setIsFormOpen={setIsFormOpen}
      list={activeLists ? true : false}
      boardId={boardId}
      listId={listId}
    />
  ) : (
    <div
      className={activeLists ? listbutton : taskButton}
      onClick={() => setIsFormOpen(true)}
    >
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>
  );
};

export default ActionButton;

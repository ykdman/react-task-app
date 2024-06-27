import { FC } from "react";
import { IList } from "../../types";
import List from "../List/List";
import ActionButton from "../ActionButton/ActionButton";
import { listContainer } from "./ListsContainer.css";

type TListContainerProps = {
  boardId: string;
  activeLists: IList[];
};

const ListsContainer: FC<TListContainerProps> = ({ activeLists, boardId }) => {
  return (
    <div className={listContainer}>
      {activeLists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId={""} activeLists />
    </div>
  );
};

export default ListsContainer;

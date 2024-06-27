import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from "./App.css.ts";
import BoardList from "./components/BoardList/BoardList.tsx";
import ListsContainer from "./components/ListsContainer/ListsContainer.tsx";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux.ts";
import EditModal from "./components/EditModal/EditModal.tsx";
import LoggerModal from "./components/LoggerModal/LoggerModal.tsx";
import { deleteBoard, sort } from "./store/slices/boardsSlice.ts";
import { addLog } from "./store/slices/loggerSlice.ts";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const dispatch = useTypedDispatch();
  const [activeBoardId, setActiveBoardId] = useState<string>("board-0");
  const [isLoggerOpen, setIsLoggerOpen] = useState<boolean>(false);
  const modalACtive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const activeBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const activeLists = activeBoard.lists;

  const deleteBoardHandler = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: activeBoard.boardId }));

      dispatch(
        addLog({
          logAuthor: "kdman",
          logId: v4(),
          logMessage: `게시판 삭제 : ${activeBoard.boardName}`,
          logTimestamp: String(Date.now()),
        })
      );
      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };
      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("최소 게시판의 개수는 한 개 입니다.");
    }
  };

  const dragHandler = (result: any) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);
    const sourceList = activeLists.filter(
      (list) => list.listId === source.droppableId
    )[0];
    console.log(sourceList);
    dispatch(
      sort({
        boardIndex: boards.findIndex(
          (board) => board.boardId === activeBoardId
        ),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId,
      })
    );

    dispatch(
      addLog({
        logAuthor: "duck",
        logId: v4(),
        logMessage: `리스트 "${sourceList.listName}" 에서 리스트 "${
          activeLists.filter(
            (list) => list.listId === destination.droppableId
          )[0].listName
        }"으로 ${
          sourceList.tasks.filter((task) => task.taskId === draggableId)[0]
            .taskName
        }을 옮김.`,
        logTimestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalACtive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DragDropContext onDragEnd={dragHandler}>
          <ListsContainer
            activeLists={activeLists}
            boardId={activeBoard.boardId}
          />
        </DragDropContext>
      </div>

      <div className={buttons}>
        <button onClick={deleteBoardHandler} className={deleteBoardButton}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
}

export default App;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoardItem, IList, ITask } from "../../types/index.ts";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoardItem[];
};

type TAddBoardAction = {
  board: IBoardItem;
};
type TRemoveListAction = {
  boardId: string;
  listId: string;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TRemoveTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TDeleteBoardAction = {
  boardId: string;
};

type TSortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-2",
              taskName: "Task 3",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
      ],
    },
    {
      boardId: "board-1",
      boardName: "두번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-2",
              taskName: "Task 3",
              taskDescription: "description",
              taskOwner: "duck",
            },
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescription: "description",
              taskOwner: "duck",
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    removeList: (state, { payload }: PayloadAction<TRemoveListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.push(payload.list) }
          : board
      );
    },

    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.push(payload.task),
                    }
                  : list
              ),
            }
          : board
      );
    },
    removeTask: (state, { payload }: PayloadAction<TRemoveTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.taskId !== payload.taskId
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId
                          ? payload.task
                          : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload.boardId
      );
    },

    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      // 같은 리스트 내
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        // call by reference 이므로 객체 주소 복사에 의해 값변경이 이루어짐
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      } else {
        // 다른 리스트
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        const card = listStart!.tasks.splice(payload.droppableIndexStart, 1);
        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdEnd
        );
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card);
      }
    },
  },
});

export const {
  sort,
  addBoard,
  removeList,
  setModalActive,
  addList,
  addTask,
  removeTask,
  updateTask,
  deleteBoard,
} = boardSlice.actions;
export const boardReducer = boardSlice.reducer;

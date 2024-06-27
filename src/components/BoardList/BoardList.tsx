import { FC, useRef, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";
import { resetUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>; // state setter 의 형식
};

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const toggleFormOpen = () => {
    setIsFormOpen((prevFormState) => !prevFormState);
  };
  const switchBoardHandler = (boardId: string) => {
    setActiveBoardId(boardId);
  };

  const clickAddButtonHandler = () => {
    setIsFormOpen(true);
    inputRef.current?.focus();
  };

  //firebase
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { isAuth } = useAuth();
  const loginHandler = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch((error) => console.error(error));
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(resetUser());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => (
        <div
          key={board.boardId}
          onClick={() => switchBoardHandler(board.boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) === idx,
            },
            {
              [boardItem]:
                boardArray.findIndex(
                  (board) => board.boardId === activeBoardId
                ) !== idx,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm toggleFormOpen={toggleFormOpen} inputRef={inputRef} />
        ) : (
          <FiPlusCircle className={addButton} onClick={clickAddButtonHandler} />
        )}
        {isAuth ? (
          <GoSignOut className={addButton} onClick={logoutHandler} />
        ) : (
          <FiLogIn className={addButton} onClick={loginHandler} />
        )}
      </div>
    </div>
  );
};

export default BoardList;

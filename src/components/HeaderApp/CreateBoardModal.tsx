import { useAppDispatch } from '../../app/hooks';
import UpdateBoards, { UpdateBoardsValues } from '../../pages/MainPage/UpdateBoardForm';
import { createBoardThunk } from '../../reducer/boards/userBoardsSlice';

interface IProps {
  visible: boolean;
  closeModalFn: () => void;
}

function CreateBoardModal({ visible, closeModalFn: closeModal }: IProps) {
  const dispatch = useAppDispatch();

  function dispatchCreateBoard({ newTitle }: UpdateBoardsValues) {
    dispatch(createBoardThunk({ title: newTitle }));
    closeModal();
  }

  return (
    <UpdateBoards
      actionType="create"
      visible={visible}
      onCancel={closeModal}
      onOk={dispatchCreateBoard}
    />
  );
}

export default CreateBoardModal;

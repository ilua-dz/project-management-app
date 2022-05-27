import { useAppDispatch } from '../../app/hooks';
import UpdateBoardsModal, { UpdateBoardsValues } from '../../pages/MainPage/UpdateBoardsModal';
import { createBoardThunk } from '../../reducer/boards/userBoardsSlice';

interface IProps {
  visible: boolean;
  closeModalFn: () => void;
}

function CreateBoardModal({ visible, closeModalFn: closeModal }: IProps) {
  const dispatch = useAppDispatch();

  function dispatchCreateBoard({ title }: UpdateBoardsValues) {
    dispatch(createBoardThunk({ title }));
    closeModal();
  }

  return (
    <UpdateBoardsModal
      actionType="create"
      visible={visible}
      onCancel={closeModal}
      onOk={dispatchCreateBoard}
    />
  );
}

export default CreateBoardModal;

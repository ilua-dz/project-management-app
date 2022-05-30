import { useParams } from 'react-router-dom';
import { createColumn } from '../../API/columns';
import { useAppSelector } from '../../app/hooks';
import UpdateBoardsModal, { UpdateBoardsValues } from '../../pages/MainPage/UpdateBoardsModal';
import { getApiSignInToken } from '../../reducer/authorization/authorizationSlice';
import { useUpdateActiveBoard } from '../../reducer/boards/userBoardsSlice';

interface IProps {
  visible: boolean;
  closeModalFn: () => void;
}

function CreateBoardModal({ visible, closeModalFn }: IProps) {
  const { boardId } = useParams();
  const token = useAppSelector(getApiSignInToken);
  const updateBoard = useUpdateActiveBoard();

  async function createColumnRequest({ title }: UpdateBoardsValues) {
    await createColumn({ token, boardId: `${boardId}`, title });
    updateBoard();
    closeModalFn();
  }

  return (
    <UpdateBoardsModal
      actionType="create"
      target="column"
      visible={visible}
      onCancel={closeModalFn}
      onOk={createColumnRequest}
    />
  );
}

export default CreateBoardModal;

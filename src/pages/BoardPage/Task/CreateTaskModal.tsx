import { useParams } from 'react-router-dom';
import { createTask } from '../../../API/tasks';
import { useAppSelector } from '../../../app/hooks';
import { getApiSignInToken, getApiUserId } from '../../../reducer/authorization/authorizationSlice';
import { useUpdateActiveBoard } from '../../../reducer/boards/userBoardsSlice';
import UpdateBoardsModal, { UpdateBoardsValues } from '../../MainPage/UpdateBoardsModal';

interface IProps {
  columnId: string;
  visible: boolean;
  closeModalFn: () => void;
}

function CreateTaskModal({ visible, closeModalFn, columnId }: IProps) {
  const { boardId } = useParams();
  const token = useAppSelector(getApiSignInToken);
  const updateBoard = useUpdateActiveBoard();
  const userId = useAppSelector(getApiUserId);

  async function createTaskRequest({ title, description }: UpdateBoardsValues) {
    await createTask(token, boardId as string, columnId, { title, description, userId });
    updateBoard();
    closeModalFn();
  }

  return (
    <UpdateBoardsModal
      actionType="create"
      target="task"
      visible={visible}
      onCancel={closeModalFn}
      onOk={createTaskRequest}
    />
  );
}

export default CreateTaskModal;

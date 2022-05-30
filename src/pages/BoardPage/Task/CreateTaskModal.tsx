import { useParams } from 'react-router-dom';
import { createTask, taskCreateRequest } from '../../../API/tasks';
import { useAppSelector } from '../../../app/hooks';
import { getApiUserId } from '../../../reducer/authorization/authorizationSlice';
import { useUpdateActiveBoard } from '../../../reducer/boards/userBoardsSlice';
import UpdateBoardsModal, { UpdateBoardsValues } from '../../MainPage/UpdateBoardsModal';
import applyToken from '../../../API/applyToken';

interface IProps {
  columnId: string;
  visible: boolean;
  closeModalFn: () => void;
}

function CreateTaskModal({ visible, closeModalFn, columnId }: IProps) {
  const { boardId } = useParams();
  const state = useAppSelector((state) => state);
  const updateBoard = useUpdateActiveBoard();
  const userId = useAppSelector(getApiUserId);

  async function createTaskRequest({ title, description }: UpdateBoardsValues) {
    const requestData = {
      boardId: `${boardId}`,
      columnId,
      token: '',
      body: { title, description, userId }
    };
    await applyToken<taskCreateRequest, ReturnType<typeof createTask>>(
      createTask,
      requestData,
      state
    );
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

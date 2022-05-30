import { DeleteOutlined } from '@ant-design/icons';
import { Card, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CallConfirm from '../../../antd/confirmModal';
import { deleteTask, ITask, updateTask } from '../../../API/tasks';
import { useAppSelector } from '../../../app/hooks';
import Colors from '../../../enumerations/Colors';
import { getApiSignInToken } from '../../../reducer/authorization/authorizationSlice';
import { useUpdateActiveBoard } from '../../../reducer/boards/userBoardsSlice';
import EditTaskModal from './EditTaskModal';
import { useDrag, useDrop } from 'react-dnd';
import DragTypes from '../../../enumerations/DragTypes';
import {
  replaceColumnTaskThunk,
  dragColumnTaskThunk
} from '../../../reducer/columns/userColumnsSlice';
import { useAppDispatch } from '../../../app/hooks';
import {
  setLastDraggableTask,
  getAppLastDraggableTask
} from '../../../reducer/columns/userColumnsSlice';

const { Text } = Typography;
interface TaskType extends ITask {
  columnId: string;
}

function Task(props: TaskType) {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { description, title, id, userId, columnId, order } = props;
  const token = useAppSelector(getApiSignInToken);
  const lastDragable = useAppSelector(getAppLastDraggableTask);
  const updateBoard = useUpdateActiveBoard();
  const { t } = useTranslation();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.card,
    item: { id, columnId, title, description, userId },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));
  const [, drop] = useDrop(
    () => ({
      accept: DragTypes.card,
      hover({
        id: draggableId,
        columnId: draggableColumnId,
        title: draggableTitle,
        description: draggableDescription,
        userId: draggableUserId
      }: Omit<TaskType, 'order'>) {
        if (id !== draggableId && lastDragable !== id) {
          const requestData = {
            columnId: draggableColumnId,
            boardId: `${boardId}`,
            taskId: draggableId,
            body: {
              title: draggableTitle,
              userId: draggableUserId,
              description: draggableDescription,
              order
            }
          }
          if (columnId === draggableColumnId) {
            dispatch(dragColumnTaskThunk(requestData));
          }
        }
        dispatch(setLastDraggableTask(id));
      }
    }),
    [lastDragable]
  );
  const opacity = isDragging ? 0 : 1;

  function showEditModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      (e.target as Element).classList.contains('ant-card-body') ||
      (e.target as Element).classList.contains('ant-card-head-title')
    ) {
      setIsEditModalVisible(true);
    }
  }

  function hideEditModal() {
    setIsEditModalVisible(false);
  }

  async function deleteTaskRequest() {
    await deleteTask({ token, boardId: boardId as string, columnId, taskId: id });
    updateBoard();
  }

  async function updateTaskRequest(text: string, title: string) {
    await updateTask({
      token,
      boardId: boardId as string,
      columnId,
      taskId: id,
      body: {
        title,
        order: props.order,
        description: text,
        userId
      }
    });
  }

  const deleteTaskTitle = `${t('modals.delete-task')} ${title}?`;

  function getDescription() {
    return description.split('\n').map((line, idx) => (
      <Text key={idx}>
        {line}
        <br />
      </Text>
    ));
  }

  return (
    <div ref={(node) => drag(drop(node))}>
      <StyledTask
        title={title}
        extra={
          <Tooltip title={t('tooltips.delete')}>
            <DeleteOutlined onClick={CallConfirm(deleteTaskTitle, deleteTaskRequest)} />
          </Tooltip>
        }
        opacity={opacity}
        onClick={showEditModal}>
        {getDescription()}
      </StyledTask>
      <EditTaskModal
        {...props}
        visible={isEditModalVisible}
        closeAction={hideEditModal}
        okAction={updateTaskRequest}
      />
    </div>
  );
}

const StyledTask = styled(Card)<{ opacity: number }>`
  padding: 0;
  border: #389e0d solid 1px;
  background-color: #ddfdd0;
  border-radius: 0.5rem;
  cursor: pointer;
  opacity: ${(props) => props.opacity};
  & * {
    color: #1c5c00;
  }

  & .ant-card-body {
    padding: 0.5rem 1rem;
  }

  & .ant-card-head {
    min-height: unset;
    border-bottom-color: ${Colors.columnDivider};
  }

  & .ant-card-head-wrapper,
  & .ant-card-head,
  & .ant-card-title {
    height: 2rem;
  }
`;

export default Task;

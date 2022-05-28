import { DeleteOutlined } from '@ant-design/icons';
import { Card, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CallConfirm from '../../../antd/confirmModal';
import { deleteTask, ITask, updateTask } from '../../../API/tasks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Colors from '../../../enumerations/Colors';
import { getApiSignInToken } from '../../../reducer/authorization/authorizationSlice';
import { useUpdateActiveBoard } from '../../../reducer/boards/userBoardsSlice';
import { getActiveBoardColumnsDataThunk } from '../../../reducer/columns/userColumnsSlice';
import EditTaskModal from './EditTaskModal';

const { Text } = Typography;
interface TaskType extends ITask {
  columnId: string;
}

function Task(props: TaskType) {
  const { boardId } = useParams();
  const { description, title, id, userId, columnId } = props;
  const token = useAppSelector(getApiSignInToken);
  const updateBoard = useUpdateActiveBoard();

  const { t } = useTranslation();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

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
    return description.split('\n').map((line) => (
      <Text key={line}>
        {line}
        <br />
      </Text>
    ));
  }

  return (
    <>
      <StyledTask
        title={title}
        extra={
          <Tooltip title={t('tooltips.delete')}>
            <DeleteOutlined onClick={CallConfirm(deleteTaskTitle, deleteTaskRequest)} />
          </Tooltip>
        }
        onClick={showEditModal}>
        {getDescription()}
      </StyledTask>
      <EditTaskModal
        {...props}
        visible={isEditModalVisible}
        closeAction={hideEditModal}
        okAction={updateTaskRequest}
      />
    </>
  );
}

const StyledTask = styled(Card)`
  padding: 0;
  border: #389e0d solid 1px;
  background-color: #ddfdd0;
  border-radius: 0.5rem;

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

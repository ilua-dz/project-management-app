import { DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CallConfirm from '../../../antd/confirmModal';
import { deleteTask, ITask, updateTask } from '../../../API/tasks';
import { useAppSelector } from '../../../app/hooks';
import { getApiSignInToken } from '../../../reducer/authorization/authorizationSlice';
import EditTaskModal from './EditTaskModal';

type TaskType = Required<ITask>;

function Task(props: TaskType) {
  const token = useAppSelector(getApiSignInToken);
  const { description, title, id, boardId, columnId } = props;
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

  function deleteTaskRequest() {
    deleteTask(token, boardId, columnId, id);
  }

  function updateTaskRequest(newText: string) {
    updateTask(token, boardId, columnId, id, { ...props, description: newText });
  }

  const deleteTaskTitle = `${t('modals.delete-task')} ${title}?`;

  return (
    <>
      <StyledTask
        title={title}
        extra={<DeleteOutlined onClick={CallConfirm(deleteTaskTitle, deleteTaskRequest)} />}
        onClick={showEditModal}>
        {description}
      </StyledTask>
      <EditTaskModal
        {...props}
        visible={isEditModalVisible}
        cancelAction={hideEditModal}
        okAction={updateTaskRequest}
      />
    </>
  );
}

const StyledTask = styled(Card).attrs({ hoverable: true })`
  padding: 0;
  margin: 0.2rem;

  & .ant-card-body {
    padding: 0.5rem 1rem;
  }

  & .ant-card-head {
    min-height: unset;
  }

  & .ant-card-head-wrapper,
  & .ant-card-head,
  & .ant-card-title {
    height: 2rem;
  }
`;

export default Task;

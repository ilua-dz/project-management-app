import { Button, Input, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IUserData } from '../../../API/dependencies';
import { ITask } from '../../../API/tasks';
import { getUser } from '../../../API/users';
import { useAppSelector } from '../../../app/hooks';
import InvisibleInput from '../../../components/styled/InvisibleInput';
import StyledBoardTag from '../../../components/styled/StyledBoardTag';
import Colors from '../../../enumerations/Colors';
import { getApiSignInToken } from '../../../reducer/authorization/authorizationSlice';
import { useUpdateActiveBoard } from '../../../reducer/boards/userBoardsSlice';

const { Text } = Typography;
interface IProps extends ITask {
  visible: boolean;
  closeAction: () => void;
  okAction: (text: string, title: string) => Promise<void>;
}

function EditTaskModal({ title, description, visible, closeAction, okAction, userId }: IProps) {
  const [text, setText] = useState(description);
  const [editableTitle, setEditableTitle] = useState(title);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const updateBoard = useUpdateActiveBoard();
  const { t } = useTranslation();
  const token = useAppSelector(getApiSignInToken);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    async function getAuthor() {
      const data = await getUser(token, userId);
      setAuthor((data as IUserData).name);
    }
    getAuthor();
  }, []);

  function highlightInput() {
    setIsInputFocused(true);
  }

  function hideInputHighlight() {
    setIsInputFocused(false);
  }

  function updateDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function onCancel() {
    setEditableTitle(title);
    setText(description);
    closeAction();
  }

  function updateTitle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditableTitle(e.target.value);
  }

  async function setNewDescription() {
    await okAction(text, editableTitle);
    updateBoard();
    closeAction();
  }

  const footer = (
    <ModalFooter>
      <Text type="secondary" keyboard>
        {t('modals.author')}
      </Text>
      <AuthorTag>{author}</AuthorTag>
      <Button onClick={onCancel}>{t('modals.cancel')}</Button>
      <Button type="primary" onClick={setNewDescription}>
        OK
      </Button>
    </ModalFooter>
  );

  return (
    <Modal
      footer={footer}
      destroyOnClose
      {...{ visible, onCancel }}
      title={<InvisibleInput onChange={updateTitle} value={editableTitle} />}
      bodyStyle={{ padding: '0 0.5rem' }}
      maskClosable>
      <StyledArea
        autoSize
        onFocus={highlightInput}
        onBlur={hideInputHighlight}
        bordered={isInputFocused}
        onChange={updateDescription}
        value={text}
      />
    </Modal>
  );
}

const StyledArea = styled(Input.TextArea)`
  overflow: hidden;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${Colors.primary};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AuthorTag = styled(StyledBoardTag)`
  margin-right: auto;
`;

export default EditTaskModal;

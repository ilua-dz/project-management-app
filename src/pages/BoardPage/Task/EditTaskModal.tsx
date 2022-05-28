import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ITask } from '../../../API/tasks';
import { useAppDispatch } from '../../../app/hooks';
import Colors from '../../../enumerations/Colors';
import { getActiveBoardColumnsDataThunk } from '../../../reducer/columns/userColumnsSlice';

interface IProps extends ITask {
  visible: boolean;
  closeAction: () => void;
  okAction: (text: string, title: string) => Promise<void>;
}

function EditTaskModal({ title, description, visible, closeAction, okAction }: IProps) {
  const [text, setText] = useState(description);
  const [editableTitle, setEditableTitle] = useState(title);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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

  function updateTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setEditableTitle(e.target.value);
  }

  async function setNewDescription() {
    await okAction(text, editableTitle);
    dispatch(getActiveBoardColumnsDataThunk());
    closeAction();
  }

  return (
    <Modal
      destroyOnClose
      {...{ visible, onCancel }}
      title={<StyledInput onChange={updateTitle} value={editableTitle} />}
      bodyStyle={{ padding: '0 0.5rem' }}
      onOk={setNewDescription}
      maskClosable
      cancelText={t('modals.cancel')}>
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

const StyledInput = styled(Input)`
  border: 1px solid transparent;
  font-size: 1.5rem;
  font-weight: 600;
  width: 90%;

  &:hover {
    border: 1px solid ${Colors.primary};
  }
`;

export default EditTaskModal;

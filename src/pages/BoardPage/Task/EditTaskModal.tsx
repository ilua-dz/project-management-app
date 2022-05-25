import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ITask } from '../../../API/tasks';
import Colors from '../../../enumerations/Colors';

interface IProps extends ITask {
  visible: boolean;
  cancelAction: () => void;
  okAction: (newText: string) => void;
}

function EditTaskModal({ title, description, visible, cancelAction, okAction }: IProps) {
  const [text, setText] = useState(description);
  const [isInputFocused, setIsInputFocused] = useState(false);
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

  function setNewDescription() {
    okAction(text);
    cancelAction();
  }

  return (
    <Modal
      {...{ title, visible }}
      bodyStyle={{ padding: '0 0.5rem' }}
      onCancel={cancelAction}
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

export default EditTaskModal;

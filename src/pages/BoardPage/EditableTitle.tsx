import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, InputRef, Typography } from 'antd';
import styled from 'styled-components';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface IProps {
  defaultValue: string;
  setValueAction: (value: string) => void;
}

function EditableTitle({ defaultValue, setValueAction }: IProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isEditable) {
      inputRef.current?.focus();
    }
  }, [isEditable]);

  function showInput() {
    setIsEditable(true);
  }

  function hideInput() {
    setIsEditable(false);
  }

  function onOk() {
    setValueAction(value);
    hideInput();
  }

  function onCancel() {
    setValue(defaultValue);
    hideInput();
  }

  function setCurrentValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function onPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'Enter') {
      onOk();
    }
  }

  return !isEditable ? (
    <Text style={{ whiteSpace: 'break-spaces' }} onClick={showInput}>
      {value}
    </Text>
  ) : (
    <InputBlock onBlur={onCancel}>
      <DesktopButtonsBlock>
        <Button block icon={<CheckSquareOutlined />} onClick={onOk} />
        <Button block icon={<CloseSquareOutlined />} onClick={onCancel} />
      </DesktopButtonsBlock>
      <TouchButtonsBlock>
        <Button type="primary" onTouchEnd={onOk}>
          OK
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </TouchButtonsBlock>
      <Input ref={inputRef} value={value} onInput={setCurrentValue} onKeyDown={onPressEnter} />
    </InputBlock>
  );
}

const InputBlock = styled.div`
  display: flex;

  & input {
    font-weight: 500;
    font-size: 1rem;
    height: 2.2rem;
    width: 95%;
  }

  @media (pointer: coarse) {
    flex-direction: column;
    padding: 0.5rem 0;
  }
`;

const TouchButtonsBlock = styled.div`
  order: 2;

  & > * {
    width: 47.5%;
  }

  @media (pointer: fine) {
    display: none;
  }
`;

const DesktopButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 2.2rem;

  & > * {
    height: 40%;
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
  }

  @media (pointer: coarse) {
    display: none;
  }
`;

export default EditableTitle;

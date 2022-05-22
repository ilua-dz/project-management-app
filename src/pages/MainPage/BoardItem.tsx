import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { List, Card, Typography } from 'antd';
import React, { CSSProperties, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CallConfirm from '../../antd/confirmModal';
import { IBoard } from '../../API/boards';
import { useAppDispatch } from '../../app/hooks';
import {
  deleteBoardThunk,
  setUserActiveBoard,
  updateBoardThunk
} from '../../reducer/boards/userBoardsSlice';
import UpdateBoards, { UpdateBoardsValues } from './UpdateBoardForm';

const { Title } = Typography;

interface BoardItemProps {
  item: IBoard;
}

const BoardItem = ({ item }: BoardItemProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);

  function hideModal() {
    setIsUpdateModalVisible(false);
  }

  function showModal() {
    setIsUpdateModalVisible(true);
  }

  function renameBoard({ newTitle }: UpdateBoardsValues) {
    dispatch(updateBoardThunk({ id: item.id, title: newTitle }));
    hideModal();
  }

  const deleteConfirmQuestion = `${t('modals.delete-board')} ${item.title}?`;
  const deleteItem = () => dispatch(deleteBoardThunk({ id: item.id }));

  const setActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as Element).classList.contains('ant-card-body')) {
      dispatch(setUserActiveBoard(item.id));
    }
  };

  return (
    <List.Item>
      <Card
        onClick={setActive}
        bodyStyle={cardBodyStyle}
        hoverable
        actions={[
          <EditOutlined key="edit" onClick={showModal} />,
          <DeleteOutlined key="delete" onClick={CallConfirm(deleteConfirmQuestion, deleteItem)} />
        ]}>
        <StyledTitle level={4}>{item.title}</StyledTitle>
      </Card>
      <UpdateBoards
        actionType="update"
        visible={isUpdateModalVisible}
        onCancel={hideModal}
        onOk={renameBoard}
        boardTitle={item.title}
      />
    </List.Item>
  );
};

const StyledTitle = styled(Title).attrs({ style: { margin: '0' } })`
  text-align: center;
`;

const cardBodyStyle: CSSProperties = {
  minHeight: '9rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default BoardItem;

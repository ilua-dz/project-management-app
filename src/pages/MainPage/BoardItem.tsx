import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { List, Card, Typography } from 'antd';
import React, { CSSProperties, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CallConfirm from '../../antd/confirmModal';
import { IBoard } from '../../API/boards';
import { useAppDispatch } from '../../app/hooks';
import Links from '../../enumerations/LinksEnum';
import {
  deleteBoardThunk,
  setUserActiveBoard,
  updateBoardThunk
} from '../../reducer/boards/userBoardsSlice';
import UpdateBoardsModal, { UpdateBoardsValues } from './UpdateBoardsModal';

const { Title } = Typography;

interface BoardItemProps {
  item: IBoard;
}

const BoardItem = ({ item }: BoardItemProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  function hideModal() {
    setIsUpdateModalVisible(false);
  }

  function showModal() {
    setIsUpdateModalVisible(true);
  }

  function renameBoard({ title }: UpdateBoardsValues) {
    dispatch(updateBoardThunk({ id: item.id, title }));
    hideModal();
  }

  const deleteConfirmQuestion = `${t('modals.delete-board')} ${item.title}?`;
  const deleteItem = () => dispatch(deleteBoardThunk({ id: item.id }));

  const goToBoardPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as Element).classList.contains('ant-card-body')) {
      dispatch(setUserActiveBoard(item.id));
      navigate(Links.boardPage);
    }
  };

  return (
    <List.Item>
      <Card
        onClick={goToBoardPage}
        bodyStyle={cardBodyStyle}
        hoverable
        actions={[
          <EditOutlined key="edit" onClick={showModal} />,
          <DeleteOutlined key="delete" onClick={CallConfirm(deleteConfirmQuestion, deleteItem)} />
        ]}>
        <StyledTitle level={4}>{item.title}</StyledTitle>
      </Card>
      <UpdateBoardsModal
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

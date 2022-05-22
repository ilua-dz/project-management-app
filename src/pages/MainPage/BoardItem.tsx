import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { List, Card, Typography } from 'antd';
import React, { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CallConfirm from '../../antd/confirmModal';
import { IBoard } from '../../API/boards';
import { useAppDispatch } from '../../app/hooks';
import { deleteBoardThunk, setUserActiveBoard } from '../../reducer/boards/userBoardsSlice';

const { Title } = Typography;

interface BoardItemProps {
  item: IBoard;
}

const BoardItem = ({ item }: BoardItemProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const deleteConfirmQuestion = `${t('confirm-modals.delete-board')} ${item.title}?`;
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
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" onClick={CallConfirm(deleteConfirmQuestion, deleteItem)} />
        ]}>
        <StyledTitle level={4}>{item.title}</StyledTitle>
      </Card>
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

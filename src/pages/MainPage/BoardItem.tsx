import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { List, Card, Typography } from 'antd';
import React, { CSSProperties, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CallConfirm from '../../antd/confirmModal';
import { IBoard } from '../../API/boards';
import { useAppDispatch } from '../../app/hooks';
import StyledBoardTag from '../../components/styled/StyledBoardTag';
import Links from '../../enumerations/LinksEnum';
import { deleteBoardThunk, updateBoardThunk } from '../../reducer/boards/userBoardsSlice';
import UpdateBoardsModal, { UpdateBoardsValues } from './UpdateBoardsModal';

const { Title, Paragraph } = Typography;

const BoardItem = ({ id, title, description }: IBoard) => {
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

  function renameBoard({ title, description }: UpdateBoardsValues) {
    dispatch(updateBoardThunk({ id, title, description }));
    hideModal();
  }

  const deleteConfirmQuestion = (
    <>
      <span>{t('modals.delete-board')} </span>
      <StyledBoardTag>{title}</StyledBoardTag>
    </>
  );
  const deleteItem = () => dispatch(deleteBoardThunk({ id }));

  const goToBoardPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as Element).classList.contains('ant-card-body')) {
      navigate(`${Links.boardPage}/${id}`);
    }
  };

  return (
    <List.Item>
      <Card
        title={<StyledTitle level={4}>{title}</StyledTitle>}
        onClick={goToBoardPage}
        bodyStyle={cardBodyStyle}
        hoverable
        actions={[
          <EditOutlined key="edit" onClick={showModal} />,
          <DeleteOutlined key="delete" onClick={CallConfirm(deleteConfirmQuestion, deleteItem)} />
        ]}>
        <Paragraph ellipsis={{ rows: 3, tooltip: description }}>{description}</Paragraph>
      </Card>
      <UpdateBoardsModal
        actionType="update"
        visible={isUpdateModalVisible}
        onCancel={hideModal}
        onOk={renameBoard}
        initialValues={{ title, description }}
      />
    </List.Item>
  );
};

const StyledTitle = styled(Title).attrs({ style: { margin: '0' } })`
  text-align: center;
`;

const cardBodyStyle: CSSProperties = {
  minHeight: '8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default BoardItem;

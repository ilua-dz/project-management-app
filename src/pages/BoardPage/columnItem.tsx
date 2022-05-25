import { Typography, Button, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { IColumn } from '../../API/columns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useCallback } from 'react';
import { updateColumnThunk, deleteColumnThunk } from '../../reducer/columns/userColumnsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CallConfirm from '../../antd/confirmModal';
import { getAppBoardsActiveId } from '../../reducer/boards/userBoardsSlice';
const { Paragraph } = Typography;

interface IColumnProps {
  data: IColumn;
}

function ColumnItem(props: IColumnProps) {
  const { title, order, id, tasks } = props.data;
  const boardId = useAppSelector(getAppBoardsActiveId);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const confirmMessage = t('confirm.delete');
  const updateColumn = useCallback((title: string) => {
    const body = { title, order };
    const columnId = id;
    dispatch(updateColumnThunk({ body, columnId, boardId }));
  }, []);
  const deleteColumn = useCallback(
    CallConfirm(confirmMessage, () => dispatch(deleteColumnThunk({ columnId: id, boardId }))),
    [confirmMessage]
  );

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        style={{ maxHeight: 600, width: 350 }}
        title={
          <TitleContainer>
            <Paragraph
              editable={{
                triggerType: ['text'],
                onChange: updateColumn
              }}>
              {title}
            </Paragraph>
            <Tooltip title={t('tooltips.delete')}>
              <Button shape="circle" icon={<CloseOutlined />} onClick={deleteColumn} />
            </Tooltip>
          </TitleContainer>
        }
        bordered={false}>
        <CardsContainer>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </CardsContainer>
      </Card>
    </div>
  );
}

const CardsContainer = styled.div`
  overflow-y: auto;
  max-height: 300px;
  padding: 10px 15px;
  margin-right: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default ColumnItem;
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { List, Card, Typography } from 'antd';
import { CSSProperties } from 'react';
import styled from 'styled-components';
import { IBoard } from '../../API/boards';

const { Title } = Typography;

interface BoardItemProps {
  item: IBoard;
  onDelete: (id: string) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ item, onDelete }: BoardItemProps) => {
  const deleteBoard = () => {
    onDelete(item.id);
  };

  return (
    <List.Item>
      <Card
        bodyStyle={cardBodyStyle}
        hoverable
        actions={[
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" onClick={deleteBoard} />
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

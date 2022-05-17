import styled, { CSSProperties } from 'styled-components';
import { List, Card } from 'antd';
import { Typography } from 'antd';
import { AppstoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PageTitle from '../../components/styled/PageTitle';

const { Title } = Typography;

const fakeData = [
  {
    title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, explicabo!'
  }
];

function MainPage() {
  return (
    <Container>
      <PageTitle textLink="titles.main-page" icon={<AppstoreOutlined />} />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3
        }}
        dataSource={fakeData}
        renderItem={(item) => (
          <List.Item>
            <Card
              bodyStyle={cardBodyStyle}
              hoverable
              actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}>
              <StyledTitle level={4}>{item.title}</StyledTitle>
            </Card>
          </List.Item>
        )}
      />
    </Container>
  );
}

const Container = styled.div`
  & .ant-row {
    margin: 0 !important;
    justify-content: center;
  }
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin: 0 !important;
`;

const cardBodyStyle: CSSProperties = {
  minHeight: '9rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default MainPage;

import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import FooterApp from '../FooterApp';
import { Content } from 'antd/lib/layout/layout';
import HeaderApp from '../HeaderApp/HeaderApp';

function LayoutApp() {
  return (
    <StyledLayout>
      <HeaderApp />
      <Content>
        <Outlet />
      </Content>
      <FooterApp />
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export default LayoutApp;

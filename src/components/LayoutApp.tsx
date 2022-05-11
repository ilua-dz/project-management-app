import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import { FooterApp } from './FooterApp';
import { Content } from 'antd/lib/layout/layout';
import HeaderApp from './HeaderApp';

const LayoutApp = () => {
  return (
    <StyledLayout>
      <HeaderApp />
      <StyledContent>
        <Outlet />
      </StyledContent>
      <FooterApp />
    </StyledLayout>
  );
};

const StyledContent = styled(Content)`
  & > div {
    height: 100%;
  }
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export default LayoutApp;

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Links from './LinksEnum';
import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const getMenuItem = (link: Links, title: string): ItemType => {
  return {
    label: <NavLink to={link}>{title}</NavLink>,
    key: link,
    style: {
      borderRadius: '1rem',
      padding: '0 0.5rem',
      margin: '0 0.5rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};

const StyledContent = styled(Content)`
  & > div {
    height: 100%;
  }
`;

const menuItems: ItemType[] = [
  getMenuItem(Links.signUpPage, 'Sign Up'),
  getMenuItem(Links.signInPage, 'Sign In'),
];

const LayoutApp= ()=> {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[useLocation().pathname]}
          items={menuItems}
          style={{ display: 'flex', alignItems: 'center' }}
        />
      </Header>

      <StyledContent>
        <Outlet />
      </StyledContent>

      <Footer style={{ textAlign: 'center' }}>footer content</Footer>
    </Layout>
  );
}

export default LayoutApp;

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Links from './LinksEnum';
import { Layout, Menu, Switch } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

function LayoutApp() {
  const { t, i18n } = useTranslation();

  const menuItems: ItemType[] = [
    getMenuItem(Links.signUpPage, t('buttons.sign-up')),
    getMenuItem(Links.signInPage, t('buttons.sign-in')),
  ];

  const changeLanguage = (isLangEN: boolean) => {
    if (isLangEN) {
      i18n.changeLanguage('en');
    } else i18n.changeLanguage('ru');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[useLocation().pathname]}
          items={menuItems}
          style={{ display: 'flex', alignItems: 'center' }}
        />
        <Switch
          checkedChildren="EN"
          unCheckedChildren="RU"
          defaultChecked
          onChange={changeLanguage}
          style={{ background: '#1890ff', margin: '0 0.5rem' }}
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

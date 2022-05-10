import { Menu, Switch } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { CSSProperties } from 'styled-components';
import Links from './LinksEnum';

const getNavMenuItem = (link: Links, title: string): ItemType => {
  return {
    label: <NavLink to={link}>{title}</NavLink>,
    key: link,
    style: navItemStyle,
  };
};

const HeaderApp = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const menuItems: ItemType[] = [
    getNavMenuItem(Links.signUpPage, t('buttons.sign-up')),
    getNavMenuItem(Links.signInPage, t('buttons.sign-in')),
  ];

  const changeLanguage = (isLangEN: boolean) => {
    if (isLangEN) {
      i18n.changeLanguage('en');
    } else i18n.changeLanguage('ru');
  };

  return (
    <StyledHeader>
      <StyledMenu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname.slice(1)]}
        items={menuItems}
      />
      <StyledSwitch
        checkedChildren="EN"
        unCheckedChildren="RU"
        defaultChecked
        onChange={changeLanguage}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledMenu = styled(Menu)`
  display: flex;
  align-items: center;
`;

const StyledSwitch = styled(Switch)`
  background: #1890ff;
  margin: 0 0.5rem;
`;

const navItemStyle: CSSProperties = {
  borderRadius: '1rem',
  padding: '0 0.5rem',
  margin: '0 0.5rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default HeaderApp;

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled, { CSSProperties } from 'styled-components';
import LangSwitch from '../LangSwitch';
import Links from '../../enumerations/LinksEnum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getApiSignInToken, signOut } from '../../reducer/authorization/authorizationSlice';
import { useState } from 'react';
import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import CreateBoardModal from './CreateBoardModal';

function getNavMenuItem(link: Links, title: string): ItemType {
  return {
    label: <NavLink to={link}>{title}</NavLink>,
    key: link,
    style: navItemStyle
  };
}

const getNavMenuButton = (onClick: () => void, title: string): ItemType => {
  return {
    label: title,
    key: title,
    style: navItemStyle,
    onClick
  };
};

function HeaderApp() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const token = useAppSelector(getApiSignInToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCreateBoardModalVisible, setIsCreateBoardModalVisible] = useState<boolean>(false);

  function showCreateBoardModal() {
    setIsCreateBoardModalVisible(true);
  }

  function hideCreateBoardModal() {
    setIsCreateBoardModalVisible(false);
  }

  function dispatchSignOut() {
    dispatch(signOut());
    navigate(Links.welcomePage);
  }

  const unauthorizedUserMenuItems: ItemType[] = [
    getNavMenuItem(Links.signUpPage, t('buttons.sign-up')),
    getNavMenuItem(Links.signInPage, t('buttons.sign-in'))
  ];

  const authorizedUserMenuItems: ItemType[] = [
    getNavMenuItem(Links.mainPage, t('buttons.mainPage')),
    getNavMenuButton(showCreateBoardModal, t('buttons.new-board')),
    getNavMenuButton(dispatchSignOut, t('buttons.sign-out'))
  ];

  function getMenuItems() {
    return token ? authorizedUserMenuItems : unauthorizedUserMenuItems;
  }

  return (
    <StyledHeader>
      <StyledMenu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname.slice(1)]}
        items={getMenuItems()}
        triggerSubMenuAction="click"
      />
      <LangSwitch />
      <CreateBoardModal visible={isCreateBoardModalVisible} closeModalFn={hideCreateBoardModal} />
    </StyledHeader>
  );
}

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
`;

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 9rem);
`;

const navItemStyle: CSSProperties = {
  borderRadius: '1rem',
  padding: '0 0.5rem',
  margin: '0 0.5rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default HeaderApp;

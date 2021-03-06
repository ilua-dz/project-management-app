import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { CSSProperties } from 'styled-components';
import LangSwitch from '../LangSwitch';
import Links from '../../enumerations/LinksEnum';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getApiSignInToken, signOut } from '../../reducer/authorization/authorizationSlice';
import { useState } from 'react';
import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import CreateBoardModal from './CreateBoardModal';
import CreateColumnModal from './CreateColumnModal';
import { ReloadOutlined } from '@ant-design/icons';
import { useBoardsRequest } from '../../pages/MainPage/MainPage';
import { useColumnsRequest } from '../../pages/BoardPage/BoardPage';

function getNavMenuItem(link: Links, title: string): ItemType {
  return {
    label: <NavLink to={link}>{title}</NavLink>,
    key: link,
    style: navItemStyle
  };
}

const getNavMenuButton = (onClick: () => void, title: string | JSX.Element): ItemType => {
  return {
    label: title,
    key: title.toString(),
    style: navItemStyle,
    onClick
  };
};

function HeaderApp() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const token = useAppSelector(getApiSignInToken);
  const dispatch = useAppDispatch();
  const [isCreateBoardModalVisible, setIsCreateBoardModalVisible] = useState<boolean>(false);
  const [isCreateColumnModalVisible, setIsCreateColumnModalVisible] = useState<boolean>(false);
  const boardsRequest = useBoardsRequest();
  const refreshColumns = useColumnsRequest();

  function refreshBoards() {
    boardsRequest({});
  }

  function showCreateBoardModal() {
    setIsCreateBoardModalVisible(true);
  }

  function hideCreateBoardModal() {
    setIsCreateBoardModalVisible(false);
  }

  function showCreateColumnModal() {
    setIsCreateColumnModalVisible(true);
  }

  function hideCreateColumnModal() {
    setIsCreateColumnModalVisible(false);
  }

  function dispatchSignOut() {
    dispatch(signOut());
  }

  const unauthorizedUserMenuItems: ItemType[] = [
    getNavMenuItem(Links.signUpPage, t('buttons.sign-up')),
    getNavMenuItem(Links.signInPage, t('buttons.sign-in'))
  ];

  const getAuthorizedUserMenuItems = (): ItemType[] => {
    const items = [
      getNavMenuItem(Links.mainPage, t('buttons.mainPage')),
      getNavMenuItem(Links.profilePage, t('buttons.profile')),
      getNavMenuButton(dispatchSignOut, t('buttons.sign-out'))
    ];
    if (pathname === Links.mainPage) {
      items.push(getNavMenuButton(showCreateBoardModal, t('buttons.new-board')));
      items.unshift(getNavMenuButton(refreshBoards, <ReloadOutlined />));
    }
    if (pathname.includes(Links.boardPage)) {
      items.push(getNavMenuButton(showCreateColumnModal, t('buttons.new-column')));
      items.unshift(getNavMenuButton(refreshColumns, <ReloadOutlined />));
    }
    return items;
  };

  function getMenuItems() {
    return token ? getAuthorizedUserMenuItems() : unauthorizedUserMenuItems;
  }

  return (
    <StyledHeader auth={token ? 1 : 0}>
      <StyledMenu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={getMenuItems()}
        triggerSubMenuAction="click"
      />
      <LangSwitch />
      <CreateBoardModal visible={isCreateBoardModalVisible} closeModalFn={hideCreateBoardModal} />
      <CreateColumnModal
        visible={isCreateColumnModalVisible}
        closeModalFn={hideCreateColumnModal}
      />
    </StyledHeader>
  );
}

const StyledHeader = styled(Header)<{ auth: number }>`
  ${({ auth }) => {
    if (auth) {
      return { position: 'sticky', top: '0', zIndex: '100' };
    }
  }}
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem;
  height: ${({ auth }) => (auth ? '2rem' : '4rem')};
  transition: all 0.5s;

  & .ant-menu-item {
    border-radius: ${({ auth }) => (auth ? '0' : '1rem')};
  }
`;

const StyledMenu = styled(Menu)`
  height: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 9rem);
`;

const navItemStyle: CSSProperties = {
  padding: '0 0.5rem',
  margin: '0 0.5rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default HeaderApp;

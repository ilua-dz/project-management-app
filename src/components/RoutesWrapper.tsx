import { Route, Routes } from 'react-router-dom';

import LayoutApp from './LayoutApp';
import { BoardPage } from '../pages/BoardPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotfoundPage';
import { WelcomePage } from '../pages/WelcomePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { SignPage } from '../pages/LoginPage';
import Links from './LinksEnum';

function RoutesWrapper() {
  return (
    <>
      <LayoutApp></LayoutApp>
      <Routes>
          <Route path={Links.welcomePage} element={<WelcomePage />} />
          <Route path={Links.signPage} element={<SignPage />} />
          <Route path={Links.profilePage} element={<EditProfilePage />} />
          <Route path={Links.mainPage} element={<MainPage />} />
          <Route path={Links.boardPage} element={<BoardPage />} />
          <Route path={Links.notFoundPage} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default RoutesWrapper;


import { Route, Routes } from 'react-router-dom';
import { BoardPage } from '../pages/BoardPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotfoundPage';
import { WelcomePage } from '../pages/WelcomePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { SignPage } from '../pages/SignPage';
import Links from './LinksEnum';

const RoutesWrapper=()=> {
  return (
    <Routes>
      <Route path={Links.welcomePage} element={<WelcomePage />} />
      <Route path={Links.mainPage} element={<MainPage />} />
      <Route path={Links.signPage} element={<SignPage />} />
      <Route path={Links.profilePage} element={<EditProfilePage />} />
      <Route path={Links.boardPage} element={<BoardPage />} />
      <Route path={Links.notFoundPage} element={<NotFoundPage />} />
    </Routes>
  );
}

export {RoutesWrapper};


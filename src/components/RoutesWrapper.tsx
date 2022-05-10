import { Route, Routes } from 'react-router-dom';
import { BoardPage } from '../pages/BoardPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotfoundPage';
import { WelcomePage } from '../pages/WelcomePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { SignPage } from '../pages/SignPage';
import Links from './LinksEnum';
import LayoutApp from './LayoutApp';

const RoutesWrapper=()=> {
  return (
    <Routes>
      <Route path={Links.welcomePage} element={<LayoutApp />}>
        <Route index element={<WelcomePage />} />
        <Route path={Links.signInPage} element={<SignPage />} />
        <Route path={Links.profilePage} element={<EditProfilePage />} />
        <Route path={Links.mainPage} element={<MainPage />} />
        <Route path={Links.boardPage} element={<BoardPage />} />
        <Route path={Links.notFoundPage} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesWrapper;

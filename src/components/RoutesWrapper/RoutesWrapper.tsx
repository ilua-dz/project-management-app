import { Route, Routes } from 'react-router-dom';
import BoardPage from '../../pages/BoardPage';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import WelcomePage from '../../pages/WelcomePage';
import EditProfilePage from '../../pages/EditProfilePage';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import Links from '../LinksEnum';
import LayoutApp from '../LayoutApp';

function RoutesWrapper() {
  return (
    <Routes>
      <Route path={Links.welcomePage} element={<LayoutApp />}>
        <Route index element={<WelcomePage />} />
        <Route path={Links.signInPage} element={<SignInPage />} />
        <Route path={Links.signUpPage} element={<SignUpPage />} />
        <Route path={Links.profilePage} element={<EditProfilePage />} />
        <Route path={Links.mainPage} element={<MainPage />} />
        <Route path={Links.boardPage} element={<BoardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesWrapper;

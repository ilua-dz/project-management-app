import { Route, Routes } from 'react-router-dom';
import BoardPage from '../../pages/BoardPage';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import WelcomePage from '../../pages/WelcomePage';
import EditProfilePage from '../../pages/EditProfilePage';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import Links from '../../enumerations/LinksEnum';
import LayoutApp from '../LayoutApp';
import RequireAuth from './RequireAuth';

function RoutesWrapper() {
  return (
    <Routes>
      <Route path={Links.welcomePage} element={<LayoutApp />}>
        <Route index element={<WelcomePage />} />
        <Route
          path={Links.signInPage}
          element={<RequireAuth page={<SignInPage />} needToBeUnauthorized />}
        />
        <Route
          path={Links.signUpPage}
          element={<RequireAuth page={<SignUpPage />} needToBeUnauthorized />}
        />
        <Route path={Links.profilePage} element={<RequireAuth page={<EditProfilePage />} />} />
        <Route path={Links.mainPage} element={<RequireAuth page={<MainPage />} />} />
        <Route path={Links.boardPage} element={<RequireAuth page={<BoardPage />} />} />
      </Route>
      <Route path="*" element={<LayoutApp />}>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesWrapper;

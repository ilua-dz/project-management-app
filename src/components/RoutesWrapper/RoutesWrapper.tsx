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
import RequireAuthorization from './RequireAuth';

function RoutesWrapper() {
  return (
    <Routes>
      <Route path={Links.welcomePage} element={<LayoutApp />}>
        <Route index element={<WelcomePage />} />
        <Route
          path={Links.signInPage}
          element={
            <RequireAuthorization needToBeUnauthorized>
              <SignInPage />
            </RequireAuthorization>
          }
        />
        <Route
          path={Links.signUpPage}
          element={
            <RequireAuthorization needToBeUnauthorized>
              <SignUpPage />
            </RequireAuthorization>
          }
        />

        <Route
          path={Links.profilePage}
          element={
            <RequireAuthorization>
              <EditProfilePage />
            </RequireAuthorization>
          }
        />
        <Route
          path={Links.mainPage}
          element={
            <RequireAuthorization>
              <MainPage />
            </RequireAuthorization>
          }
        />
        <Route
          path={Links.boardPage}
          element={
            <RequireAuthorization>
              <BoardPage />
            </RequireAuthorization>
          }
        />
      </Route>
      <Route path="*" element={<LayoutApp />}>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesWrapper;
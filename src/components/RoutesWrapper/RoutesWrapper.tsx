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
            <RequireAuthorization needToBeUnauthorized={true}>
              <SignInPage />
            </RequireAuthorization>
          }
        />
        <Route
          path={Links.signUpPage}
          element={
            <RequireAuthorization needToBeUnauthorized={true}>
              <SignUpPage />
            </RequireAuthorization>
          }
        />

        <Route
          path={Links.profilePage}
          element={
            <RequireAuthorization needToBeUnauthorized={false}>
              <EditProfilePage />
            </RequireAuthorization>
          }
        />
        <Route
          path={Links.mainPage}
          element={
            <RequireAuthorization needToBeUnauthorized={false}>
              <MainPage />
            </RequireAuthorization>
          }
        />
        <Route
          path={Links.boardPage}
          element={
            <RequireAuthorization needToBeUnauthorized={false}>
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

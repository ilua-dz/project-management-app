import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Links from '../../enumerations/LinksEnum';
import {
  getApiSignInToken,
  getApiSignUpData
} from '../../reducer/authorization/authorizationSlice';

type Props = {
  children: JSX.Element;
};

function RequireAuthorization({ children }: Props) {
  const token = useAppSelector(getApiSignInToken);

  // Первый цикл для того, чтобы бы после удачной авторизации был автоматический переход на signInPage,
  // если убрать этот цикл, то после авторизации юзер видит сообщение, что авторизован(Регистрация завершена. Войдите под своим именем),
  // но сам должен перейти на signInPage. Как лучше? В ниже приведенном варианте юзер после авторизации уже не может перейти на signUpPage

  const dataSignUp = useAppSelector(getApiSignUpData);
  const location = useLocation();

  if (location.pathname === Links.signUpPage && dataSignUp.id) {
    return <Navigate to={Links.signInPage} replace />;
  }

  if (token) {
    return <Navigate to={Links.mainPage} replace />;
  }
  return children;
}

export default RequireAuthorization;

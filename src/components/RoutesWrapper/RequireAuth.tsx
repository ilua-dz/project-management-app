import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Links from '../../enumerations/LinksEnum';
import { getApiSignInToken } from '../../reducer/authorization/authorizationSlice';

type Props = {
  children: JSX.Element;
  needToBeUnauthorized?: boolean;
};

function RequireAuthorization({ children, needToBeUnauthorized = false }: Props) {
  const token = useAppSelector(getApiSignInToken);

  if (!token && !needToBeUnauthorized) {
    return <Navigate to={Links.welcomePage} replace />;
  }

  if (token && needToBeUnauthorized) {
    return <Navigate to={Links.mainPage} replace />;
  }

  return children;
}

export default RequireAuthorization;

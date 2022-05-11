import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>
        This is page with Error 404. Go
        <NavLink to="/"> Welcome Page! </NavLink>
      </p>
    </div>
  );
};

export default ErrorPage;

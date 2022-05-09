import { NavLink, Outlet } from 'react-router-dom';
import Links from './LinksEnum';

function LayoutApp() {
  return (
    <>
      <header>
        <NavLink to={Links.welcomePage}>Welcome</NavLink>
        <NavLink to={Links.signPage}>Sign</NavLink>
        <NavLink to={Links.mainPage}>Main</NavLink>
        <NavLink to={Links.boardPage}>Board</NavLink>
        <NavLink to={Links.notFoundPage}>404</NavLink>
      </header>
      <Outlet/>
    </>
  );
}

export default LayoutApp;

import { NavLink } from "react-router-dom";
import Links from "./LinksEnum";

const HeaderApp = () => {
  return (
      <header>
        <NavLink to={Links.welcomePage}>Welcome</NavLink>
        <NavLink to={Links.signInPage}>Sign</NavLink>
        <NavLink to={Links.profilePage}>Profile</NavLink>
        <NavLink to={Links.mainPage}>Main</NavLink>
        <NavLink to={Links.boardPage}>Board</NavLink>
        <NavLink to={Links.notFoundPage}>404</NavLink>
      </header>
  );
};

export { HeaderApp };
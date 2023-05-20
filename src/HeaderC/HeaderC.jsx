import s from "./HeaderC.module.css"
import { Header } from "@mantine/core";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

function HeaderC() {
  
  let linkActive = linkData => linkData.isActive ? s.linkActive : s.link

  return (
    <Header height={80} className={s.header} mb={30}>
      <div className={s.logo}>
        <img src="https://www.freepnglogos.com/uploads/telegram-logo-png-0.png" atl="logo"></img>
      </div>
      <div className={s.linkContainer}>
        <NavLink to="/" className={linkActive}>
          Поиск вакансий
        </NavLink>
        <NavLink to="/fav" className={linkActive}>
          Избранное
        </NavLink>
      </div>
    </Header>
  );
}

export default HeaderC;

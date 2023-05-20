import s from "./HeaderC.module.css"
import { Header } from "@mantine/core";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

function HeaderC() {
  
  

  return (
    <Header height={80} className={s.header} mb={30}>
      <div className={s.logo}>
        <img atl="logo" src="https://www.freepnglogos.com/uploads/telegram-logo-png-0.png"></img>
      </div>
      <div className={s.linkContainer}>
        <NavLink to="/" className={s.linkItem}>
          Поиск вакансий
        </NavLink>
        <NavLink to="/fav" className={s.linkItem}>
          Избранное
        </NavLink>
      </div>
    </Header>
  );
}

export default HeaderC;

/* eslint-disable jsx-a11y/alt-text */
import s from "./HeaderC.module.css"
import { Header } from "@mantine/core";
import { NavLink } from "react-router-dom";

function HeaderC() {

  // handle active link
  let linkActive = linkData => linkData.isActive ? s.linkActive : s.link

  return (
    <Header id="header" height={80} className={s.header} mb={30}>
      <div className={s.logo}>
        <img src={process.env.REACT_APP_API_URL + "logo.png"} atl="sitelogoalt"></img>
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

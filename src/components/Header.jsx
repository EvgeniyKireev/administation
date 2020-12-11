import s from "../styles/header.module.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export const Header = (props) => {
  return (
    <div className={s.header}>
      <SupervisorAccountIcon fontSize={"large"} />
      <h3 style={{ paddingLeft: "10px" }}>Admin panel</h3>
      <div className={s.buttons}>
        <NavLink to={"/"} className={s.button}>
          <Button>Главная</Button>
        </NavLink>
        <NavLink to={"/create"} className={s.button}>
          <Button>Создать</Button>
        </NavLink>
      </div>
    </div>
  );
};

import ReactDOM from "react-dom";
import React from "react";
import s from "../styles/modal.module.css";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { validate } from "../common/validator";

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(1),
    minWidth: 210,
    zIndex: 999999,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    zIndex: 999999,
  },
}));

export const Modal = ({ data, setPeople, editPeople, setModal }) => {
  const classes = useStyles();
  const changePassword = (e) => {
    setPeople({ ...data, password: e.target.value });
  };
  const changePhone = (e) => {
    setPeople({ ...data, phone: e.target.value });
  };
  const changeName = (e) => {
    setPeople({ ...data, name: e.target.value });
  };
  const changeRole = (e) => {
    setPeople({ ...data, role: e.target.value });
  };
  const valid =
    !validate.validatePassword(data.password) ||
    !validate.validPhone(data.phone) ||
    !validate.validName(data.name) ||
    data.role.length === 0;
  return ReactDOM.createPortal(
    <div className={s.main}>
      <div className={s.form}>
        <h2>Редактировать</h2>
        <div className={s.el}>
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            value={data.password}
            onChange={changePassword}
          />
        </div>
        {!validate.validatePassword(data.password) && (
          <div className={s.error}>пароль менее 6 символов</div>
        )}
        <div className={s.el}>
          <TextField
            id="outlined-basic"
            label="phone"
            variant="outlined"
            onChange={changePhone}
            value={data.phone}
          />
        </div>
        {!validate.validPhone(data.phone) && (
          <div className={s.error}>Укажите номер телефона (без +)</div>
        )}
        <div className={s.el}>
          <TextField
            id="outlined-basic"
            label="f   ull name"
            variant="outlined"
            onChange={changeName}
            value={data.name}
          />
        </div>
        {!validate.validName(data.name) && (
          <div className={s.error}>Укажите Фамилию и Имя</div>
        )}
        <div className={s.el}>
          <Select
            className={classes.formControl}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.role}
            onChange={changeRole}
          >
            <MenuItem value={"client"}>client</MenuItem>
            <MenuItem value={"partner"}>partner</MenuItem>
            <MenuItem value={"admin"}>admin</MenuItem>
          </Select>
        </div>
        {data.role.length === 0 && <div className={s.error}>выберите роль</div>}
        <div className={s.el}>
          <Button
            disabled={valid}
            variant="outlined"
            color="primary"
            onClick={() => {
              editPeople(data.email);
            }}
          >
            Изменить
          </Button>
        </div>
        <div className={s.el}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setModal(false);
            }}
          >
            Закрыть
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

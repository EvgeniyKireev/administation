import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import s from "../styles/createuser.module.css";
import Button from "@material-ui/core/Button";
import { ls } from "../common/localStorageAPI";
import { validate } from "../common/validator";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export const CreateUser = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [role, setRole] = React.useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    role: "",
  });
  const changeEmail = (e) => {
    setRole({ ...role, email: e.target.value });
  };
  const changePassword = (e) => {
    setRole({ ...role, password: e.target.value });
  };
  const changePhone = (e) => {
    setRole({ ...role, phone: e.target.value });
  };
  const changeName = (e) => {
    setRole({ ...role, fullName: e.target.value });
  };
  const changeRole = (e) => {
    setRole({ ...role, role: e.target.value });
  };
  const addUser = () => {
    ls.addDataToLocalArray("users", {
      ...role,
      dateCreate: Date.now(),
      dateChange: Date.now(),
    });
    history.push("/");
  };
  const valid =
    role.role.length === 0 ||
    !validate.validName(role.fullName) ||
    !validate.validPhone(role.phone) ||
    !validate.validatePassword(role.password) ||
    !validate.validateEmail(role.email) ||
    validate.emailInStore(ls.getLocalData("users"), role.email);
  return (
    <div className={s.main}>
      <div className={s.el}>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          value={role.email}
          onChange={changeEmail}
        />
      </div>
      {!validate.validateEmail(role.email) && (
        <div className={s.error}>Введите корректный email</div>
      )}
      {validate.emailInStore(ls.getLocalData("users"), role.email) && (
        <div className={s.error}>такой email уже существует</div>
      )}
      <div className={s.el}>
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          onChange={changePassword}
        />
      </div>
      {!validate.validatePassword(role.password) && (
        <div className={s.error}>пароль менее 6 символов</div>
      )}
      <div className={s.el}>
        <TextField
          value={role.phone}
          id="outlined-basic"
          label="phone"
          variant="outlined"
          onChange={changePhone}
        />
      </div>
      {!validate.validPhone(role.phone) && (
        <div className={s.error}>Укажите номер телефона (без +)</div>
      )}
      <div className={s.el}>
        <TextField
          id="outlined-basic"
          label="Full name"
          variant="outlined"
          onChange={changeName}
        />
      </div>
      {!validate.validName(role.fullName) && <div className={s.error}>Укажите Фамилию и Имя</div>}
      <div className={s.el}>
        <Select
          className={classes.formControl}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role.role}
          onChange={changeRole}
        >
          <MenuItem value={"client"}>client</MenuItem>
          <MenuItem value={"partner"}>partner</MenuItem>
          <MenuItem value={"admin"}>admin</MenuItem>
        </Select>
      </div>
      {role.role.length === 0 && <div className={s.error}>выберите роль</div>}
      <div className={s.el}>
        <Button
          disabled={valid}
          onClick={addUser}
          variant="outlined"
          color="primary"
        >
          Создать
        </Button>
      </div>
    </div>
  );
};

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { makeStyles } from "@material-ui/core";
import s from "../styles/optionsort.module.css";
const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(1),
    minWidth: 120,
    marginRight: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const OptionSort = ({ sort, handleChange, sortSearch, setSearch }) => {
  const classes = useStyles();
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={s.option}>
      <Select
        className={classes.formControl}
        id="demo-simple-select"
        value={sort}
        onChange={handleChange}
      >
        <MenuItem value={""}>не выбрано</MenuItem>
        <MenuItem value={"client"}>client</MenuItem>
        <MenuItem value={"partner"}>partner</MenuItem>
        <MenuItem value={"admin"}>admin</MenuItem>
      </Select>
      <TextField
        value={sortSearch}
        onChange={changeSearch}
        id="standard-basic"
        label="email или телефон"
      />
    </div>
  );
};

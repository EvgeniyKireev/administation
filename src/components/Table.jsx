import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { ls } from "../common/localStorageAPI";
import { Modal } from "./Modal";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  name,
  email,
  password,
  phone,
  role,
  dateCreate,
  dateChange
) {
  return { name, email, password, phone, role, dateCreate, dateChange };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({
  users,
  sort,
  sortSearch,
  setUsers,
}) {
  const [toggleModal, setModal] = useState(false);
  const [selectedPeople, setPeople] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    dateCreate: "",
  });
  const classes = useStyles();
  let rows;
  if (sort === "" && sortSearch !== "") {
    rows = users
      .filter(
        (item) =>
          item.email.toLowerCase().search(sortSearch) !== -1 ||
          item.phone.toLowerCase().search(sortSearch) !== -1
      )
      .map((u) =>
        createData(
          u.fullName,
          u.email,
          u.password,
          u.phone,
          u.role,
          u.dateCreate,
          u.dateChange
        )
      );
  } else if (sort != "" && sortSearch === "") {
    rows = users
      .filter((u) => {
        return u.role === sort;
      })
      .filter(
        (item) =>
          item.email.toLowerCase().search(sortSearch) !== -1 ||
          item.phone.toLowerCase().search(sortSearch) !== -1
      )
      .map((u) =>
        createData(
          u.fullName,
          u.email,
          u.password,
          u.phone,
          u.role,
          u.dateCreate,
          u.dateChange
        )
      );
  } else if (sort != "" && sortSearch != "") {
    rows = users
      .filter((u) => {
        return u.role === sort;
      })
      .filter(
        (item) =>
          item.email.toLowerCase().search(sortSearch) !== -1 ||
          item.phone.toLowerCase().search(sortSearch) !== -1
      )
      .map((u) =>
        createData(
          u.fullName,
          u.email,
          u.password,
          u.phone,
          u.role,
          u.dateCreate,
          u.dateChange
        )
      );
  } else {
    rows = users.map((u) =>
      createData(
        u.fullName,
        u.email,
        u.password,
        u.phone,
        u.role,
        u.dateCreate,
        u.dateChange
      )
    );
  }
  const deleteUser = (key) => {
    ls.removeDataFromLocalArray("users", key);
    setUsers(users.filter((item) => item.email !== key));
  };
  const changeUser = (row) => {
    setPeople({
      name: row.name,
      email: row.email,
      password: row.password,
      phone: row.phone,
      role: row.role,
      dateCreate: row.dateCreate,
    });
    setModal(true);
  };
  const editPeople = (email) => {
    ls.editDataFromLocalArray("users", email, selectedPeople);
    setModal(false);
    setUsers(ls.getLocalData("users"));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>name</StyledTableCell>
            <StyledTableCell align="right">email</StyledTableCell>
            <StyledTableCell align="right">password</StyledTableCell>
            <StyledTableCell align="right">phone</StyledTableCell>
            <StyledTableCell align="right">role</StyledTableCell>
            <StyledTableCell align="right">date create</StyledTableCell>
            <StyledTableCell align="right">date change</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.password}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.role}</StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.dateCreate).getDay()}.
                {new Date(row.dateCreate).getMonth()}.
                {new Date(row.dateCreate).getFullYear()}&nbsp;
                {new Date(row.dateCreate).getHours()}:
                {new Date(row.dateCreate).getMinutes()}
              </StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.dateCreate).getDay()}.
                {new Date(row.dateChange).getMonth()}.
                {new Date(row.dateChange).getFullYear()}&nbsp;
                {new Date(row.dateChange).getHours()}:
                {new Date(row.dateChange).getMinutes()}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => deleteUser(row.email)}>delete</Button>
                <Button onClick={() => changeUser(row)}>edit</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {toggleModal && (
        <Modal
          setPeople={setPeople}
          data={selectedPeople}
          setModal={setModal}
          editPeople={editPeople}
        />
      )}
    </TableContainer>
  );
}

import s from "../styles/maincontent.module.css";
import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { OptionSort } from "./OptionSort";
import CustomizedTables from "./Table";

export const MainContent = ({ usersData }) => {
  const [sort, setSort] = React.useState("");
  const [sortSearch, setSearch] = React.useState("");
  const [users, setUsers] = React.useState(usersData);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <div className={s.main}>
      <div className={s.option}>
        <Typography variant="body1">Сортировать по:</Typography>
        <OptionSort
          sort={sort}
          handleChange={handleChange}
          setSearch={setSearch}
          sortSearch={sortSearch}
        />
      </div>

      <div className={s.people}>
        <CustomizedTables
          users={users}
          sort={sort}
          sortSearch={sortSearch}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
};

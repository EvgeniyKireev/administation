import "./App.css";
import React, { useState } from "react";
import { Header } from "./components/Header";
import { Route } from "react-router-dom";
import { MainContent } from "./components/MainContent";
import { CreateUser } from "./components/CreateUser";
import { ls } from "./common/localStorageAPI";

function App() {
  if (!localStorage.getItem("users")) {
    ls.addDataToLocalArray("users", {
      email: "admin@admin.ru",
      password: "admin123",
      phone: "79245415441",
      fullName: "Иванов Иван",
      role: "admin",
      dateCreate: Date.now(),
      dateChange: Date.now(),
    });
  }

  return (
    <div className="App">
      <Header />
      <Route path={"/create"} render={() => <CreateUser />} />
      <Route
        path={"/"}
        exact
        render={() => <MainContent usersData={ls.getLocalData("users")} />}
      />
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import UserFormComponent from "./userForm/userForm";
import UserDataComponent from "./userData/userList";

function App() {
  return (
    <div className="App">
      <UserFormComponent />
      <UserDataComponent/>
    </div>
  );
}

export default App;

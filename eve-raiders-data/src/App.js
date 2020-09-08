import React from "react";
import Dashboard from "./Dashboard";
import UnauthenticatedApp from "./UnauthenticatedApp";
import useUser from "./context/user";
import "./App.scss";

const App = () => {
  const user = useUser();

  return (
    <div className="App">{user ? <Dashboard /> : <UnauthenticatedApp />}</div>
  );
};

export default App;

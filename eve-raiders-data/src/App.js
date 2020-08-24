import React from "react";
import Dashboard from "./Dashboard";
import { ReactQueryDevtools } from "react-query-devtools";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <ReactQueryDevtools initialIsOpen={false} />
      <Dashboard />
    </div>
  );
}

export default App;

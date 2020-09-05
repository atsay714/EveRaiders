import React from "react";
import { Router } from "react-router-dom";
import { UserContext } from "./context/user";
import { AuthContext } from "./context/auth";

const users = {
  approved: {
    approved: true,
    discordUser: "testuser#12345",
    id: "8b4c6a9d-b00d-4530-acd1-deda79b666b4",
    pilotNames: [{ id: 1, name: "Test Pilot" }],
    superAdmin: true,
    username: "testuser",
  },
  unapproved: {
    approved: false,
    discordUser: "testuser#12345",
    id: "8b4c6a9d-b00d-4530-acd1-deda79b666b4",
    pilotNames: [],
    superAdmin: false,
    username: "testuser",
  },
};

export const WrappedComponent = ({
  history,
  user = "approved",
  token = "12345",
  children = <Dashboard />,
}) => (
  <Router history={history}>
    <UserContext.Provider value={users[user]}>
      <AuthContext.Provider value={{ token, setToken: () => {} }}>
        {children}
      </AuthContext.Provider>
    </UserContext.Provider>
  </Router>
);

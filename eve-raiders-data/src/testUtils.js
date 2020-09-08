import React from "react";
import { Router } from "react-router-dom";
import { UserContext } from "./context/user";
import { AuthContext } from "./context/auth";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Routes from "./Routes";

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

export const RoutesWithContext = ({
  history,
  token = "12345",
  user = "approved",
  loggedOut,
}) => {
  return (
    <Router history={history}>
      <UserContext.Provider value={loggedOut ? undefined : users[user]}>
        <AuthContext.Provider
          value={
            loggedOut
              ? { token: undefined }
              : {
                  data: token,
                  login: () => {},
                  register: () => {},
                  logout: () => {},
                }
          }
        >
          <Routes />
        </AuthContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export const testRoute = ({
  route,
  loggedInText = "Find Resources",
  loggedOutText = "Raiders EVE Echoes Tools",
  approved = true,
}) => {
  describe(`Route - ${route}`, () => {
    test("Logged in", async () => {
      const history = createMemoryHistory();
      history.push(route);

      render(
        <RoutesWithContext
          history={history}
          user={approved ? "approved" : "unapproved"}
        />
      );

      expect(await screen.findByText(loggedInText));
      expect(history.location.pathname === route);
    });

    test("Not logged in", async () => {
      const history = createMemoryHistory();
      history.push(route);

      render(<RoutesWithContext history={history} loggedOut />);

      expect(await screen.findByText(loggedOutText));
      expect(history.location.pathname === "/login");
    });
  });
};

import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../testUtils";
import Login from "./";

test("Route - /login", async () => {
  const history = createMemoryHistory();
  history.push("/login");

  render(
    <WrappedComponent history={history} token={undefined}>
      <Login />
    </WrappedComponent>
  );

  expect(await screen.findByText("Raiders EVE Echoes Tools"));
  expect(await screen.findByText("Create Account"));
});

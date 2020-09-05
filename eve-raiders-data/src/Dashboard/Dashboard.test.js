import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./";
import { WrappedComponent } from "../testUtils";

// I don't know what these need to do anymore, now that routing has changed.
// revist this as soon as possible
test.skip("Default route", async () => {
  const history = createMemoryHistory();

  render(
    <WrappedComponent history={history} token={undefined}>
      <Dashboard />
    </WrappedComponent>
  );

  expect(await screen.findByText("Raiders EVE Echoes Tools"));
});

test.skip("Route - /dashboard/awaiting-approval", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/awaiting-approval");

  render(
    <WrappedComponent history={history}>
      <Dashboard />
    </WrappedComponent>
  );
  expect(await screen.findByText("Account is currently awaiting approval."));
});

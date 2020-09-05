import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../testUtils.js";
import ResetPassword from "./";

test("Route - /reset-password", async () => {
  const history = createMemoryHistory();
  history.push("/reset-password");

  delete window.location;
  window.location = {
    href: "http://localhost:3000/reset-password?token=12345",
  };

  render(
    <WrappedComponent history={history}>
      <ResetPassword />
    </WrappedComponent>
  );

  expect(await screen.findAllByText("Change Password"));

  window.location = location;
});

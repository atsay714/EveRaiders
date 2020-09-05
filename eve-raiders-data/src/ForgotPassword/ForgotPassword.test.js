import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../testUtils.js";
import ForgotPassword from "./";

test("Route - /forgot-password", async () => {
  const history = createMemoryHistory();
  history.push("/forgot-password");

  render(
    <WrappedComponent history={history}>
      <ForgotPassword />
    </WrappedComponent>
  );

  expect(await screen.findByText("Forgot Password"));
});

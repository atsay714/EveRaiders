import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../testUtils.js";
import AwaitingApproval from "./";

test("Route - /dashboard/awaiting-approval", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/awaiting-approval");

  render(
    <WrappedComponent history={history} user={"unapproved"}>
      <AwaitingApproval />
    </WrappedComponent>
  );

  expect(await screen.findByText("Account is currently awaiting approval."));
});

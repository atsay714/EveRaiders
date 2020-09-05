import React from "react";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { WrappedComponent } from "../../../testUtils";
import UserAdmin from "./";

test("Route - /dashboard/admin/users", async () => {
  const history = createMemoryHistory();
  history.push("/dashboard/admin/users");

  render(
    <WrappedComponent history={history}>
      <UserAdmin />
    </WrappedComponent>
  );

  expect(await screen.findByText("User Administration"));
});

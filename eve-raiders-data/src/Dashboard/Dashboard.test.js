import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitForElement, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./";
import axios from "axios";

test("renders dashboard", async () => {
  const { getAllByText } = render(<Dashboard />);
  await waitForElement(() => getAllByText(/Tanoo I/i));
  const [planetName] = getAllByText(/Tanoo I/i);
  expect(planetName).toBeInTheDocument();
});

import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitForElement, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "./";

const mockData = [
  {
    id: 40000002,
    name: "Tanoo I",
    type: "Temperate",
    system: "Tanoo",
    constellation: "San Matar",
    resources: [
      {
        type: "Base Metals",
        richness: "Medium",
      },
      {
        type: "Condensates",
        richness: "Medium",
      },
      {
        type: "Heavy Water",
        richness: "Rich",
      },
    ],
  },
];

const server = setupServer(
  rest.get(
    "https://everaiders.azurewebsites.net/api/planets",
    (req, res, ctx) => {
      return res(ctx.json(mockData));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders a table", async () => {
  const { getAllByText } = render(<Dashboard />);
  await waitForElement(() => getAllByText(/Tanoo I/i));
  const [planetName] = getAllByText(/Tanoo I/i);
  expect(planetName).toBeInTheDocument();
});

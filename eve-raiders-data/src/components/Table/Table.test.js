import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import mockData from "../../mockData";
import Table from ".";

test("renders Dashhboard", async () => {
  const { getAllByText } = render(<Table data={mockData} />);

  const [name] = getAllByText("Tanoo I");
  const [type] = getAllByText("Temperate");
  const [system] = getAllByText("Tanoo");
  const [constellation] = getAllByText("San Matar");

  const [type1] = getAllByText("Base Metals");
  const [type2] = getAllByText("Condensates");
  const [type3] = getAllByText("Heavy Water");
  const [type4] = getAllByText("Noble Metals");

  const [richness1] = getAllByText("Rich");
  const [richness2] = getAllByText("Medium");
  const [richness3] = getAllByText("Poor");
  const [richness4] = getAllByText("Perfect");

  expect(name).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(system).toBeInTheDocument();
  expect(constellation).toBeInTheDocument();
  expect(type1).toBeInTheDocument();
  expect(type2).toBeInTheDocument();
  expect(type3).toBeInTheDocument();
  expect(type4).toBeInTheDocument();
  expect(richness1).toBeInTheDocument();
  expect(richness2).toBeInTheDocument();
  expect(richness3).toBeInTheDocument();
  expect(richness4).toBeInTheDocument();
});

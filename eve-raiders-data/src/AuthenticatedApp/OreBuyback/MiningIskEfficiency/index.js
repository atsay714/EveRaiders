import React, { useState, useMemo } from "react";
import { getResources } from "api/resources";
import Table from "components/Table";
import { useQuery } from "react-query";
import Select from "components/inputs/Select";
import styles from "./MiningIskEfficiency.module.scss";

const orePerUnit = {
  Veldspar: 0.1,
  Plagioclase: 0.35,
  Scordite: 0.15,
  Omber: 0.6,
  Pyroxeres: 1.5,
  Kernite: 1.2,
  "Dark Orche": 1.6,
  Gneiss: 2.0,
  Spodanium: 3.2,
  Hemorphite: 3.0,
  Hedbergite: 3.0,
  Jaspet: 4.0,
  Crokite: 6.4,
  Bistot: 6.4,
  Arkonor: 6.4,
  Mercoxit: 8,
};

const piPerUnit = {
  "Base Metals": 0.04,
  Condensates: 0.02,
  "Condensed Alloy": 0.01,
  "Construction Blocks": 0.01,
  Coolant: 0.02,
  "Crystal Compound": 0.01,
  "Dark Compound": 0.01,
  "Fiber Composite": 0.01,
  "Gleaming Alloy": 0.01,
  "Glossy Compound": 0.01,
  "Heavy Metals": 0.01,
  "Heavy Water": 0.01,
  "Industrial Fibers": 0.04,
  "Ionic Solutions": 0.04,
  "Liquid Ozone": 0.03,
  "Lucent Compound": 0.01,
  "Lustering Alloy": 0.01,
  "Motley Compound": 0.01,
  Nanites: 0.04,
  "Noble Gas": 0.01,
  "Noble Metals": 0.01,
  "Opulent Compound": 0.01,
  "Oxygen Isotopes": 0.05,
  Plasmoids: 0.06,
  Polyaramids: 0.02,
  "Precious Alloy": 0.01,
  "Reactive Gas": 0.01,
  "Reactive Metals": 0.04,
  "Sheen Compound": 0.01,
  "Silicate Glass": 0.02,
  "Smartfab Units": 0.02,
  "Supertensile Plastics": 0.02,
  "Suspended Plasma": 0.02,
  "Toxic Metals": 0.04,
};

const mineralsPerUnit = {
  Tritanium: 0.01,
  Pyerite: 0.01,
  Mexallon: 0.01,
  Isogen: 0.01,
  Nocxium: 0.01,
  Zydrine: 0.01,
  Megacyte: 0.01,
  Morphite: 0.01,
};

const MiningIskEfficiency = () => {
  const [units, setUnits] = useState("ISK per m3"); // m3 or unit
  const [resource, setResource] = useState("Ore"); // Ore or PI

  const { loading, error, data = [] } = useQuery("resources", getResources, {
    staleTime: 999999999999,
  });

  const columns = useMemo(
    () => [
      {
        Header: (
          <Select
            items={["Ore", "PI", "Minerals"]}
            onChange={setResource}
            value={resource}
          />
        ),
        accessor: "name",
      },
      {
        Header: (
          <Select
            items={["ISK per m3", "ISK per unit"]}
            onChange={setUnits}
            value={units}
          />
        ),
        accessor: "pricePerUnit",
        Cell: ({ value }) =>
          value.toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        style: {
          textAlign: "right",
        },
      },
    ],
    [units, resource]
  );

  const ores = data
    .filter((resource) => orePerUnit[resource.name])
    .map((ore) => ({
      name: ore.name,
      pricePerUnit:
        units === "ISK per m3"
          ? (1 / orePerUnit[ore.name]) * ore.price
          : ore.price,
    }))
    .sort((a, b) => b.pricePerUnit - a.pricePerUnit);

  const planetaryMaterial = data
    .filter((resource) => piPerUnit[resource.name])
    .map((pi) => ({
      name: pi.name,
      pricePerUnit:
        units === "ISK per m3" ? (1 / piPerUnit[pi.name]) * pi.price : pi.price,
    }))
    .sort((a, b) => b.pricePerUnit - a.pricePerUnit);

  const minerals = data
    .filter((resource) => mineralsPerUnit[resource.name])
    .map((pi) => ({
      name: pi.name,
      pricePerUnit:
        units === "ISK per m3"
          ? (1 / mineralsPerUnit[pi.name]) * pi.price
          : pi.price,
    }))
    .sort((a, b) => b.pricePerUnit - a.pricePerUnit);

  const dataMap = {
    Ore: ores,
    PI: planetaryMaterial,
    Minerals: minerals,
  };

  return (
    <div className={styles.iskEfficiency}>
      <h3 className={styles.header}>What is selling for the most?</h3>
      <Table data={dataMap[resource]} columns={columns} />
    </div>
  );
};

export default MiningIskEfficiency;

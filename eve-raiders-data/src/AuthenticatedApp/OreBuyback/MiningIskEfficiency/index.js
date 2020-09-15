import React, { useMemo } from "react";
import { getResources } from "api/resources";
import Table from "components/Table";
import { useQuery } from "react-query";
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

const MiningIskEfficiency = () => {
  const { loading, error, data = [] } = useQuery("resources", getResources, {
    staleTime: 999999999999,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Ore",
        accessor: "name",
      },
      {
        Header: (
          <>
            ISK per m<sup>3</sup>
          </>
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
    []
  );

  const ores = data
    .filter((resource) => orePerUnit[resource.name])
    .map((ore) => ({
      name: ore.name,
      pricePerUnit: (1 / orePerUnit[ore.name]) * ore.price,
    }))
    .sort((a, b) => b.pricePerUnit - a.pricePerUnit);

  return (
    <div className={styles.iskEfficiency}>
      <h3 className={styles.header}>What is selling for the most?</h3>
      <Table data={ores} columns={columns} />
    </div>
  );
};

export default MiningIskEfficiency;

import React, { useMemo } from "react";
import { getResources } from "api/resources";
import Table from "components/Table";
import { useQuery } from "react-query";
import styles from "./MiningIskEfficiency.module.scss";

const orePerUnit = {
  Veldspar: 10,
  Plagioclase: 2.86,
  Scordite: 6.67,
  Omber: 1.67,
  Pyroxeres: 0.67,
  Kernite: 0.83,
  "Dark Orche": 0.625,
  Gneiss: 0.5,
  Spodanium: 0.31244444444444447,
  Hemorphite: 0.33,
  Hedbergite: 0.33,
  Jaspet: 0.25,
  Crokite: 0.156,
  Bistot: 0.156,
  Arkonor: 0.156,
  Mercoxit: 0.125,
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
      pricePerUnit: (orePerUnit[ore.name] * ore.price).toLocaleString({
        style: "currency",
      }),
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

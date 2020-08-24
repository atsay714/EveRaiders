import React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.scss";

const Table = ({ data, columns, placeholder }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table} {...getTableProps()}>
        <thead className={styles.headers}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={styles.headerCell}
                  style={column.style || {}}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.body} {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className={styles.row} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={styles.cell}
                      style={cell.column.style || {}}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className={styles.placeholder}>{placeholder}</div>
      )}
    </div>
  );
};

export default Table;

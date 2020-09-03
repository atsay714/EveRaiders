import React, { useMemo } from "react";
import Table from "../../../components/Table";
import Button from "../../../components/inputs/Button";
import PageHeader from "../../../components/PageHeader";
import { getUsers, approveUser } from "../../../api/admin";
import { useQuery, useMutation, queryCache } from "react-query";
import styles from "./Users.module.scss";

const Users = () => {
  const { loading, error, data = [] } = useQuery("users", getUsers);

  const [mutate] = useMutation(approveUser, {
    onMutate: (newUsername) => {
      const previousUsers = queryCache.getQueryData("users");

      queryCache.setQueryData("users", (users) => {
        const userToUpdate = users.find(
          (user) => user.username === newUsername
        );
        return users.map((user) =>
          user.username === newUsername
            ? { ...userToUpdate, approved: true }
            : user
        );
      });

      return previousUsers;
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: "Approved",
        accessor: "approved",
        Cell: (v) => {
          if (v.value) {
            return "Approved";
          } else {
            return (
              <Button
                style={{ height: 25 }}
                onClick={() => mutate(v.row.original.username)}
              >
                Approve
              </Button>
            );
          }
        },
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Username",
        accessor: "username",
        style: {
          textAlign: "left",
        },
      },
      {
        Header: "Discord User",
        accessor: "discordUser",
        style: {
          textAlign: "left",
        },
      },
    ],
    []
  );

  return (
    <div className={styles.users}>
      <PageHeader>User Administration</PageHeader>
      <Table
        data={data}
        columns={columns}
        placeholder="No data for selected filters"
      />
    </div>
  );
};

export default Users;

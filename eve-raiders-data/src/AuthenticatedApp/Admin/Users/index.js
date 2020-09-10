import React, { useState, useMemo } from "react";
import Table from "components/Table";
import Button from "components/inputs/Button";
import PageHeader from "components/PageHeader";
import { getUsers, approveUser } from "api/admin";
import { useQuery, useMutation, queryCache } from "react-query";
import styles from "./Users.module.scss";

const Users = () => {
  const [userBtnLoading, setUserBtnLoading] = useState(); // stores username for the button that is loading
  const { loading, error, data = [] } = useQuery("users", getUsers);

  const [mutate] = useMutation(approveUser, {
    onSuccess: (updatedUser) =>
      queryCache.setQueryData("users", (users) =>
        users.map((user) =>
          user.username === updatedUser.username ? updatedUser : user
        )
      ),
    onSettled: () => {
      setUserBtnLoading();
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: "Approved",
        accessor: "approved",
        Cell: (v) => {
          if (v.value) {
            return (
              <Button
                style={{ height: 25, width: 80 }}
                onClick={() => {
                  setUserBtnLoading(v.row.original.username);
                  mutate({
                    userName: v.row.original.username,
                    approve: false,
                  });
                }}
                loading={true}
                loading={userBtnLoading === v.row.original.username}
              >
                Unapprove
              </Button>
            );
          } else {
            return (
              <Button
                style={{ height: 25, width: 80 }}
                onClick={() => {
                  setUserBtnLoading(v.row.original.username);
                  mutate({
                    userName: v.row.original.username,
                    approve: true,
                  });
                }}
                loading={userBtnLoading === v.row.original.username}
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
      },
      {
        Header: "Discord User",
        accessor: "discordUser",
      },
    ],
    [userBtnLoading]
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

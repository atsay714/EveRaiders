import React, { useEffect, useContext } from "react";
import DashboardRoutes from "./DashboardRoutes";
import { useQuery } from "react-query";
import { getCurrentUser } from "../api/users";
import NavBar from "./NavBar";
import useAuth from "../context/auth";
import useCurrentUser from "../context/user";
import { history } from "../App";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/user";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { loading, error, data: currentUser } = useQuery(
    "currentUser",
    getCurrentUser
  );

  const { token } = useAuth();

  if (currentUser?.approved === false) {
    return <Redirect to="/awaiting-approval" />;
  }

  return (
    <div className={styles.dashboard}>
      <UserContext.Provider value={currentUser}>
        {token && <NavBar />}
        <div className={styles.content}>
          <DashboardRoutes />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default Dashboard;

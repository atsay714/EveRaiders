import React, { useEffect, useContext } from "react";
import Routes from "../Routes";
import { useQuery } from "react-query";
import { getCurrentUser } from "../api/users";
import NavBar from "./NavBar";
import { TokenContext, UserContext } from "../contexts";
import { history } from "../App";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { loading, error, data: currentUser } = useQuery(
    "currentUser",
    getCurrentUser
  );

  const [token, setToken] = useContext(TokenContext);

  useEffect(() => {
    if (currentUser?.approved === false) {
      history.push("/awaiting-approval");
    }
  }, [currentUser?.approved]);

  return (
    <div className={styles.dashboard}>
      <UserContext.Provider value={currentUser}>
        {token && <NavBar />}
        <div className={styles.content}>
          <Routes />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default Dashboard;

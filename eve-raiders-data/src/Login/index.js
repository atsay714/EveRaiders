import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import styles from "./Login.module.scss";

const Login = ({ initialForm = "login" }) => {
  const [page, setPage] = useState(initialForm);

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Raiders EVE Echoes Tools</h1>
      <div className={styles.formContainer}>
        <img className={styles.logo} src="/logo.png" alt="raiders logo" />
        {page === "login" ? (
          <LoginForm onBack={() => setPage("registration")} />
        ) : (
          <RegistrationForm onBack={() => setPage("login")} />
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext, useEffect } from "react";
import { login } from "../api/auth";
import { useHistory, useLocation } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import { TokenContext } from "../contexts";
import styles from "./Login.module.scss";

const Login = ({ onLogin, initialForm = "login" }) => {
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

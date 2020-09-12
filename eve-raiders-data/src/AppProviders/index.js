import React from "react";
import { Router } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { createBrowserHistory } from "history";
import { AuthProvider } from "context/auth";
import { UserProvider } from "context/user";
import { ModalProvider } from "components/Modal";

const queryConfig = {
  queries: {
    refetchAllOnWindowFocus: false,
    staleTime: Infinity,
  },
};

export const history = createBrowserHistory();

const AppProviders = ({ children }) => (
  <ReactQueryConfigProvider config={queryConfig}>
    <AuthProvider>
      <UserProvider>
        <ModalProvider>
          <Router history={history}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </Router>
        </ModalProvider>
      </UserProvider>
    </AuthProvider>
  </ReactQueryConfigProvider>
);

export default AppProviders;

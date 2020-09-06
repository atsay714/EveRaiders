import React from "react";
import classNames from "classnames";
import { queryCache } from "react-query";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Button from "../inputs/Button";
import styles from "./ErrorBoundary.module.scss";

const ErrorBoundary = ({ className, children }) => (
  <ReactErrorBoundary
    onReset={() => queryCache.resetErrorBoundaries()}
    fallbackRender={({ error, resetErrorBoundary }) => (
      <div className={classNames(className, styles.errorBoundary)}>
        There was an error!
        <Button className={styles.button} onClick={() => resetErrorBoundary()}>
          Try again
        </Button>
      </div>
    )}
  >
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;

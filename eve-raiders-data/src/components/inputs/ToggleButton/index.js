import React from "react";
import classNames from "classnames";
import Button from "components/inputs/Button";
import styles from "./ToggleButton.module.scss";

const ToggleButton = ({ actions = [] }) => (
  <div className={styles.toggleButton}>
    {actions.map((action) => (
      <Button
        className={classNames(styles.button, {
          [styles.selected]: action.selected,
        })}
        onClick={action.onClick}
        hover={action.selected}
      >
        {action.label}
      </Button>
    ))}
  </div>
);

export default ToggleButton;

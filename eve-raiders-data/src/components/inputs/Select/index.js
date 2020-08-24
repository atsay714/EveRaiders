import React from "react";
import { useSelect } from "downshift";
import BaseInput from "../BaseInput";
import classNames from "classnames";
import { MdExpandMore } from "react-icons/md";
import styles from "./Select.module.scss";

const Select = ({
  className,
  label,
  items = [],
  name,
  placeholder,
  value,
  onChange,
  error,
  itemToString = (item) => item,
}) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    itemToString,
    items,
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem);
    },
  });

  return (
    <div className={className}>
      <BaseInput
        className={styles.inputWrapper}
        active={isOpen}
        label={label}
        name={name}
        error={error}
        {...getToggleButtonProps()}
      >
        {(ref) => (
          <button ref={ref} className={styles.input} type="button">
            {selectedItem || (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
            <MdExpandMore className={styles.dropdownIcon} size={16} />
          </button>
        )}
      </BaseInput>
      <ul
        {...getMenuProps()}
        className={classNames(styles.menu, { [styles.open]: isOpen })}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={classNames(styles.item, {
                [styles.highlighted]: highlightedIndex === index,
              })}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;

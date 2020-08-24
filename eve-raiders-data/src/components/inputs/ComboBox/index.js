import React, { useState } from "react";
import { useCombobox } from "downshift";
import BaseInput from "../BaseInput";
import classNames from "classnames";
import styles from "./ComboBox.module.scss";
import { MdExpandMore } from "react-icons/md";

const ComboBox = ({
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
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getToggleButtonProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    itemToString: (item) => (item ? itemToString(item) : ""),
    items: inputItems,
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem);
    },
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div className={className}>
      <BaseInput label={label} name={name} error={error}>
        {(ref) => (
          <div className={styles.combobox} {...getComboboxProps()}>
            <input
              className={styles.input}
              spellCheck="false"
              {...getInputProps({
                name,
                placeholder,
                ref,
              })}
            />
            <div
              className={styles.dropdownIcon}
              {...getToggleButtonProps({
                onClick: () => setInputItems(items),
              })}
            >
              <MdExpandMore size={16} />
            </div>
          </div>
        )}
      </BaseInput>

      <ul
        {...getMenuProps()}
        className={classNames(styles.menu, { [styles.open]: isOpen })}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={classNames(styles.item, {
                [styles.highlighted]: highlightedIndex === index,
              })}
              key={`${itemToString(item)}${index}`}
              {...getItemProps({
                item: itemToString(item),
                index,
              })}
            >
              {itemToString(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ComboBox;

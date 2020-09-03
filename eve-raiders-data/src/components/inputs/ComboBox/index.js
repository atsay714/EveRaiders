import React, { useState, useEffect, useRef } from "react";
import { useCombobox } from "downshift";
import RingLoader from "@bit/davidhu2000.react-spinners.ring-loader";
import BaseInput from "../BaseInput";
import classNames from "classnames";
import styles from "./ComboBox.module.scss";
import { MdExpandMore } from "react-icons/md";
import ReactDOM from "react-dom";

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
  loading,
  scrollRef,
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

  const [boundingRect, setBoundingRect] = useState({});
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setBoundingRect(ref.current.getBoundingClientRect());
    }
  }, [ref.current]);

  useEffect(() => {
    const resizeListener = () => {
      if (ref.current) {
        setBoundingRect(ref.current.getBoundingClientRect());
      }
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [ref.current]);

  return (
    <div ref={ref} className={classNames(className, styles.comboboxContainer)}>
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
      {ReactDOM.createPortal(
        <ul
          {...getMenuProps()}
          className={classNames(styles.menu, { [styles.open]: isOpen })}
          style={{
            left: boundingRect.x,
            top:
              boundingRect.y +
                4 +
                boundingRect.height / 2 -
                (scrollRef?.current?.scrollTop || 0) || undefined,
          }}
        >
          {isOpen && (
            <>
              {loading ? (
                <div className={styles.loader}>
                  <RingLoader
                    size={26}
                    color={getComputedStyle(
                      document.documentElement
                    ).getPropertyValue("--color-text-white")}
                  />
                </div>
              ) : (
                <>
                  {inputItems.map((item, index) => (
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
                </>
              )}
            </>
          )}
        </ul>,
        document.querySelector("#root")
      )}
    </div>
  );
};

export default ComboBox;

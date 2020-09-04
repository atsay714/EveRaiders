import React, { useState, useEffect, useRef } from "react";
import { useSelect } from "downshift";
import BaseInput from "../BaseInput";
import classNames from "classnames";
import { MdExpandMore } from "react-icons/md";
import styles from "./Select.module.scss";
import ReactDOM from "react-dom";

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
  scrollRef,
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
    <div ref={ref} className={className}>
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
      {ReactDOM.createPortal(
        <ul
          {...getMenuProps()}
          className={classNames(styles.menu, { [styles.open]: isOpen })}
          style={{
            left: boundingRect.x,
            top:
              boundingRect.y +
                boundingRect.height +
                boundingRect.height / 2 -
                (scrollRef?.current?.scrollTop || 0) || undefined,
          }}
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
        </ul>,
        document.body
      )}
    </div>
  );
};

export default Select;

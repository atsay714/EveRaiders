import React from "react";
import Modal from "components/Modal";
import styles from "./AboutModal.module.scss";

const AboutModal = ({ onClose }) => (
  <Modal onClose={onClose} hideSubmit>
    <span>This app was created by:</span>
    <h2>Software Engineers</h2>
    <ul>
      <li className={styles.author}>Band#2556 (Hans Anmaicok)</li>
      <li className={styles.author}>xavi#9148 (Xaviair)</li>
      <li className={styles.author}>
        DoublyLinkedList#4995 (DoublyLinkedList)
      </li>
    </ul>
    <h2>Product Owners</h2>
    <ul>
      <li className={styles.author}>TBNRregs#6114 (TBNRregs)</li>
    </ul>
    <span>
      Feel free to reach out to us on
      Disco‌​‌​‌​​⁠‌​​​​‌​⁠‌​​‌‌‌​⁠‌​‌​​‌​⁠‌‌‌​​‌​⁠‌‌​​‌​‌⁠‌‌​​‌‌‌⁠‌‌‌​​‌‌⁠‌​​​‌‌⁠‌‌​‌‌​⁠‌‌​​​‌⁠‌‌​​​‌⁠‌‌​‌​​⁠‌​​​​​⁠‌​‌​​​​⁠‌‌‌​​‌​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​‌⁠‌​‌​​​​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌‌​​⁠‌‌‌​​​‌​⁠‌​​​​​​​⁠‌​​​‌​‌‌⁠‌‌​‌‌‌‌⁠‌‌​‌​‌​⁠‌‌​​‌​‌⁠‌‌​​​‌‌⁠‌‌‌​‌​​⁠‌​​​​​⁠‌​​‌‌​‌⁠‌‌​​​​‌⁠‌‌​‌‌‌​⁠‌‌​​​​‌⁠‌‌​​‌‌‌⁠‌‌​​‌​‌⁠‌‌‌​​‌​rd
      with any issues or suggestions.
    </span>
  </Modal>
);

export default AboutModal;

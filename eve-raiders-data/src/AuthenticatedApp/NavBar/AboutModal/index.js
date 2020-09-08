import React from "react";
import Modal from "components/Modal";
import styles from "./AboutModal.module.scss";

const AboutModal = ({ onClose }) => (
  <Modal onClose={onClose} hideSubmit>
    <span>This app was created by:</span>
    <ul>
      <li className={styles.author}>Band#2556 (Hans Anmaicok)</li>
      <li className={styles.author}>xavi#9148 (Xaviair)</li>
    </ul>
    <span>
      Feel free to reach out to us on Discord with any issues or suggestions.
    </span>
  </Modal>
);

export default AboutModal;

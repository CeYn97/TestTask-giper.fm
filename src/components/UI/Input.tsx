import React from "react";
import styles from "../../styles/Shared.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = (props) => (
  <input className={styles.input} {...props} />
);

import React from 'react';
import styles from '../../styles/shared.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<Props> = ({ label, ...props }) => (
  <button className={styles.button} {...props}>{label}</button>
);

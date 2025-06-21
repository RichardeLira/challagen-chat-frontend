// src/components/UserStatus.tsx
import React from 'react';
import styles from '../styles/UserStatus.module.css';
import { UserStatusProps } from '../types';

const UserStatus: React.FC<UserStatusProps> = ({ status }) => {
  const statusClass = styles[status] || styles.offline;
  return <div className={`${styles.dot} ${statusClass}`} />;
};

export default UserStatus;
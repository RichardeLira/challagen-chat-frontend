// src/components/ChatHeader.tsx
import React from 'react';
import Image from 'next/image';
import styles from '../styles/ChatHeader.module.css';
import UserStatus from './UserStatus';
// Removidos ícones de ação FaPhoneAlt, FaVideo, etc.
import { ChatHeaderProps } from '../types';

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className={styles.chatHeader}>
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <Image src={user.avatar} alt={user.name} width={40} height={40} className={styles.avatar} />
          <UserStatus status={user.status} />
        </div>
        <div className={styles.nameAndStatus}>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userStatusText}>
            {user.status === 'online' ? 'Active' : 'Offline'}
            {/* Removido lastActive */}
          </div>
        </div>
      </div>
      {/* Removidos todos os ícones de ação */}
    </div>
  );
};

export default ChatHeader;
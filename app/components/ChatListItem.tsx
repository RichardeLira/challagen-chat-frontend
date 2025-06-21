// src/components/ChatListItem.tsx
import React from 'react';
import Image from 'next/image';
import styles from '../styles/ChatListItem.module.css';
import UserStatus from './UserStatus';
import { ChatListItemProps } from '../types';

const ChatListItem: React.FC<ChatListItemProps> = ({ user, isActive, onClick }) => {
  return (
    <div
      className={`${styles.chatListItem} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(user.id)}
    >
      <div className={styles.avatarContainer}>
        <Image src={user.avatar} alt={user.name} width={48} height={48} className={styles.avatar} />
        {user.status && <UserStatus status={user.status} />}
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{user.name}</div>
 
      </div>
    </div>
  );
};

export default ChatListItem;
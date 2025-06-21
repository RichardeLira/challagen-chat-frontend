// src/components/ChatList.tsx
import React from 'react';
import ChatListItem from './ChatListItem';
import styles from '../styles/ChatList.module.css';
 
import { ChatListProps } from '../types';

const ChatList: React.FC<ChatListProps> = ({ users, activeChatId, onSelectChat, userName }) => {
  return (
    <div className={styles.chatListContainer}>
      <div className={styles.chatListHeader}>
        <span className={styles.headerTitle}>Chats de {userName}</span> {/* Removida a contagem */}
        {/* Removidos ícones */}
      </div>
      <div className={styles.chatList}>
        {users.map(user => (
          <ChatListItem
            key={user.id}
            user={user}
            isActive={user.id === activeChatId}
            onClick={onSelectChat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
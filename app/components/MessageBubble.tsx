// src/components/MessageBubble.tsx
import React from 'react';
import Image from 'next/image';
import styles from '../styles/MessageBubble.module.css';
import { MessageBubbleProps } from '../types';

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`${styles.messageBubble} ${message.isMine ? styles.myMessage : styles.theirMessage}`}>
      {!message.isMine && (
        <div className={styles.avatarContainer}>
          <Image src={message.avatar} alt="Avatar" width={32} height={32} className={styles.avatar} />
        </div>
      )}
      <div className={styles.messageContent}>
        <div className={styles.text}>{message.content}</div>
        <div className={styles.timestamp}>{message.timestamp}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
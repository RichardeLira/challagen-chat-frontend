// src/components/MessageInput.tsx
"use client";
import React, { useState } from 'react';
import styles from '../styles/MessageInput.module.css';
import { MessageInputProps } from '../types';

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.messageInputContainer}>
      <input
        type="text"
        placeholder="Type a message..."
        className={styles.messageInputField}
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
      />
      {/* Removidos todos os ícones */}
    </form>
  );
};

export default MessageInput;
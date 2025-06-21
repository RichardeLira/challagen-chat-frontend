// src/pages/index.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import ChatList from './components/ChatList';
import ChatHeader from './components/chatHeader'; // Casing corrigido
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import styles from './styles/Home.module.css';
import { Message, User, SendMessageDto } from '../app/types';

import { io, Socket } from 'socket.io-client';

interface BackendUser {
  _id: string;
  name: string;
}

let socket: Socket | null = null;

export default function Home() {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [activeChatUserName, setActiveChatUserName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const activeUser = users.find(user => user.name === activeChatUserName);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [myUserName, setMyUserName] = useState<string | null>(null);

  useEffect(() => {
    const userNameFromLS = localStorage.getItem('userName');

    if (!userNameFromLS) {
      router.replace('/login');
      return;
    }

    setMyUserName(userNameFromLS);

    if (!socket) {
      socket = io('http://localhost:3000');
    }

    socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket!', socket?.id);
      if (userNameFromLS) {
        socket?.emit('registerUser', userNameFromLS);
      }
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor WebSocket.');
    });

    socket.on('message', (data: SendMessageDto) => {
      console.log('Mensagem recebida via WS:', data);
      // Verifica se a mensagem é para o chat ativo
      if (
          (data.from === myUserName && data.to === activeChatUserName) ||
          (data.from === activeChatUserName && data.to === myUserName)
         ) {
        // Esta é a ÚNICA vez que a mensagem é adicionada ao estado 'messages'
        const receivedMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: data.from,
          receiverId: data.to,
          content: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMine: data.from === myUserName,
          avatar: data.from === myUserName ? '/avatars/my-avatar.png' : activeUser?.avatar || '/avatars/default-user.png',
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    });

    socket.on('userRegistered', (userName: string) => {
      console.log(`Backend confirmou registro do usuário: ${userName}`);
    });

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('message');
        socket.off('userRegistered');
      }
    };
  }, [router, myUserName, activeChatUserName, activeUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/talks/all-talks');
        if (!response.ok) {
          throw new Error('Falha ao buscar usuários do backend.');
        }
        const backendUsers: BackendUser[] = await response.json();

        let mappedUsers: User[] = backendUsers.map(user => ({
          id: user._id,
          name: user.name,
          avatar: '/avatars/default-user.png',
          status: 'online',
        }));

        if (myUserName) {
            mappedUsers = mappedUsers.filter(user => user.name !== myUserName);
        }

        setUsers(mappedUsers);
        if (mappedUsers.length > 0) {
          setActiveChatUserName(mappedUsers[0].name);
        }
        setInitialized(true);
        setMessages([]);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setInitialized(true);
      }
    };

    if (myUserName) {
      fetchUsers();
    }
  }, [myUserName]);

  useEffect(() => {
    if (initialized) {
      scrollToBottom();
    }
  }, [messages, initialized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (newMessageText: string) => {
    if (!socket || !activeChatUserName || !myUserName) {
      console.error('Socket não conectado, chat ativo não definido ou usuário não logado.');
      return;
    }

    const messageToSend: SendMessageDto = {
      from: myUserName,
      to: activeChatUserName,
      message: newMessageText,
    };

    // REMOVIDA A ADIÇÃO OTIMISTA AQUI para evitar duplicação.
    // A mensagem será adicionada ao estado 'messages' SOMENTE quando for recebida de volta do servidor
    // através do socket.on('message').

    // Removido socket.emit('join') daqui. Ele deve ser chamado apenas ao SELECIONAR um chat.
    // Se você já está em uma sala de chat e envia uma mensagem, não precisa "entrar" na sala novamente.
    socket.emit('message', messageToSend);
  };

  const handleSelectChat = (userId: string) => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setActiveChatUserName(selectedUser.name);
      setMessages([]); // Limpa mensagens do chat anterior

      // **Adicionado**: Emitir 'join' quando um chat é selecionado
      // Isso garante que o usuário entre na sala de conversa correta
      if (socket && myUserName && selectedUser.name) {
        socket.emit('join', { userId: myUserName, withUserId: selectedUser.name });
      }
    }
  };

  if (!initialized) {
    return (
      <div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#fff' }}>Carregando chats...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="A chat application UI clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.chatListSection}>
          <ChatList
            users={users}
            activeChatId={activeUser?.id || ''}
            onSelectChat={handleSelectChat}
          />
        </div>

        <div className={styles.chatWindowSection}>
          {activeUser ? (
            <>
              <ChatHeader user={activeUser} />
              <div className={styles.messageList}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className={styles.noChatSelected}>
              <p>Selecione um chat para começar a conversar.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
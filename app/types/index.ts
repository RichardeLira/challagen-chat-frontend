// src/types/index.ts

export interface User {
  id: string; // Este será o _id do MongoDB para o cliente
  name: string; // Este será o nome do usuário, usado para formar a sala
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  senderId: string; // Pode ser o nome do remetente
  receiverId: string; // Pode ser o nome do destinatário
  content: string;
  timestamp: string;
  isMine: boolean;
  avatar: string;
}

// A interface SendMessageDto deve usar os nomes se o backend usa nomes para getRoomName
export interface SendMessageDto {
  from: string; // Nome do remetente
  to: string;   // Nome do destinatário
  message: string;
}

// Props para componentes específicos (podem ser definidos no próprio componente se preferir)
export interface ChatListItemProps {
  user: User;
  isActive: boolean;
  onClick: (userId: string) => void;
}

export interface ChatListProps {
  users: User[];
  activeChatId: string;
  onSelectChat: (userId: string) => void;
}

export interface ChatHeaderProps {
  user: User | undefined;
}

export interface MessageBubbleProps {
  message: Message;
}

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export interface UserStatusProps {
  status: 'online' | 'offline' | 'away';
}
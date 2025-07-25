# 💬 Realtime Chat App — NestJS + Next.js + MongoDB

Este é um projeto fullstack de chat em tempo real usando:

- 🔙 **Backend**: NestJS + WebSocket (Socket.IO)
- 🔜 **Frontend**: Next.js + Socket.IO Client
- 🗃️ **Banco de Dados**: MongoDB

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) v18+
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)


-- 

## ⚠️ Observação
Não execute o projeto 2 vezes ao mesmo tempo no mesmo navegador pois haverá conflito de localStorage. 
O ideal é usar o chat em navegadores separados, ou, use uma aba em modo Private para executar
Dessa forma você vai conseguir mandar mensagens de um para outro sem problemas 


---

## 📁 Estrutura do Projeto

```bash
.
├── backend/ (Repositorio backend)    # NestJS WebSocket API
└── frontend/   # Next.js Chat UI

## 💻 Como rodar?

# Backend
# 1. Vá para o diretório do backend
cd backend

# 2. Instale as dependências
yarn install

# 3. Configure o arquivo .env (opcional)
# Exemplo: .env
# MONGODB_URI=mongodb://localhost:27017/chatapp

# 4. Inicie o servidor
yarn start:dev



# FrontEnd
# 1. Vá para o diretório do frontend
cd frontend

# 2. Instale as dependências
yarn install

# 3. Configure o arquivo .env.local (opcional)
# Exemplo: .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3000

# 4. Inicie o frontend
yarn dev


## ✅ Resultado Esperado
Interface de chat disponível em http://localhost:3001

Conexão WebSocket com backend NestJS

Nomes de usuarios e gerenciamento de sessões disponiveis no mongoDb

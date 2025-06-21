# 💬 Chat App — NestJS + NextJS + WebSocket + MongoDB

Este projeto é um sistema de chat em tempo real 1:1, com backend em **NestJS**, frontend em **NextJS**, comunicação por **WebSocket (Socket.IO)** e persistência de dados no **MongoDB**.

---

## 📦 Tecnologias

- **Backend:** NestJS, WebSocketGateway (Socket.IO), Mongoose (MongoDB)
- **Frontend:** NextJS, socket.io-client
- **Banco de Dados:** MongoDB

---

## 🚀 Como rodar o projeto localmente

### ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) rodando localmente em `mongodb://localhost:27017`
- [Yarn](https://yarnpkg.com/) ou `npm` instalado

---

### 🔧 Backend - NestJS

```bash
# 1. Vá para o diretório do backend
cd backend

# 2. Instale as dependências
yarn install

# 3. Rode o servidor (porta padrão: 3000)
yarn start:dev

// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Login.module.css';

// Interface para o DTO que será enviado ao backend
interface CreateUserDto {
  name: string;
}

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Novo estado para controlar o loading
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => { // Marcar como async
    e.preventDefault();

    if (userName.trim() === '') {
      setError('Por favor, digite seu nome.');
      return;
    }

    setError(null);
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      // Faz a requisição POST para o backend
      const response = await fetch('http://localhost:3000/create-user', { // ALtere a porta se seu backend estiver em outra!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName.trim() } as CreateUserDto), // Envia o DTO
      });

      if (!response.ok) {
        // Se a resposta não for OK (ex: 400, 500), tenta ler a mensagem de erro do backend
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar usuário no backend.');
      }

      // Se a requisição for bem-sucedida, você pode opcionalmente ler a resposta
      const userData = await response.json();
      console.log('Usuário criado/verificado no backend:', userData);

      // Armazena o nome do usuário no localStorage
      localStorage.setItem('userName', userName.trim());
      // Redireciona para a página inicial
      router.push('/');

    } catch (err: any) { // Usar 'any' para o erro para capturar mensagens de erro variadas
      console.error('Erro ao fazer login:', err);
      setError(err.message || 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento, independente do resultado
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Bem-vindo ao Chat App!</h1>
        <p className={styles.subtitle}>Por favor, digite seu nome para continuar.</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="Seu nome"
            className={styles.nameInput}
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            disabled={isLoading} // Desabilita o input durante o carregamento
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            className={styles.startButton}
            disabled={isLoading} // Desabilita o botão durante o carregamento
          >
            {isLoading ? 'Aguarde...' : 'Começar a Conversar'} {/* Texto dinâmico no botão */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
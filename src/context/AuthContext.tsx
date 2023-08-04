import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextData {
    authenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    // Verificar se o usuário já possui um token JWT salvo (pode ser no localStorage ou sessionStorage)
    const token = localStorage.getItem("token"); // ou sessionStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []); // O array vazio [] indica que o useEffect será executado apenas uma vez, quando o componente for montado

  const login = (token: string) => {
    // Salvar o token no localStorage ou sessionStorage, dependendo dos requisitos de segurança da sua aplicação
    localStorage.setItem("token", token); // ou sessionStorage.setItem('token', token);
    setAuthenticated(true);
  };

  const logout = () => {
    // Remover o token do localStorage ou sessionStorage ao fazer logout
    localStorage.removeItem("token"); // ou sessionStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

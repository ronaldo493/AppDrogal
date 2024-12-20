import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken, clearToken } from '../utils/Storage';
import { loginUser } from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await getToken();
      if (token) {
        //Valida o token no backend e recupera informações do usuário
        setUser({ token });
      }
    };
    initializeAuth();
  }, []);

  const login = async (username, password) => {
    const userData = await loginUser(username, password);
    if (userData) {
      setUser(userData);
      setToken(userData.token); //Armazena o token no AsyncStorage
      navigate('/home'); //Redireciona após login bem-sucedido
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setUser(null);
    clearToken();
    navigate('/login'); //Redireciona para a tela de login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

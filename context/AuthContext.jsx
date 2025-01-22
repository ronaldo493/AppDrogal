import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Criando o contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);

    //Crregamento do token
    const tokenStorage = async () => {
        try {
          setLoading(true);
          const storedToken = await AsyncStorage.getItem('userToken');
          if (storedToken) {
            setToken(storedToken);
          }
        } catch (err) {
          console.error('Erro ao carregar token:', err);
        } finally {
          setLoading(false);
        }
    };

    //Salvar o token no AsyncStorage
    const saveToken = async (newToken) => {
        try {
            await AsyncStorage.setItem('userToken', newToken);
            setToken(newToken);
        } catch (err) {
            console.error('Erro ao salvar token no AsyncStorage:', err);
        }
    };

    //Limpar o token do AsyncStorage
    const clearToken = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setToken(null);
            setUser(null);
        } catch (err) {
            console.error('Erro ao remover token do AsyncStorage:', err);
        }
    };

    useEffect(() => {
       tokenStorage(); 
    }, []);

    const contextValue = {
        user,
        setUser,
        token,
        setToken: saveToken,
        clearToken,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={contextValue}> 
            {loading ? null : children}
        </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}
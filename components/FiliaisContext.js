import React, { createContext, useState, useEffect, useContext } from 'react';
import { openDatabaseAsync } from 'expo-sqlite';

//Criando o contexto
const FiliaisContext = createContext();

//Provedor - Envolvendo os componentes e fornecendo os dados
export const FiliaisProvider = ({ children }) => {
  const [filiais, setFiliais] = useState([]);

  // Carregando as filiais do banco de dados
  useEffect(() => {
    const loadFiliais = async () => {
      try {
        const database = await openDatabaseAsync('DataStrapi.db');
        const rows = await database.getAllAsync('SELECT * FROM filiais');
        setFiliais(rows);
      } catch (error) {
        console.error('Erro ao carregar filiais:', error);
      }
    };
    loadFiliais();
  }, []);

  return (
    <FiliaisContext.Provider value={{ filiais, loadFiliais }}>
      {children} 
    </FiliaisContext.Provider>
  );
};

//Hook
export const useFiliais = () => {
    return useContext(FiliaisContext);
}


import { openDatabaseAsync } from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState } from 'react';

//Criando o contexto
const FiliaisContext = createContext();

//Provedor - Envolvendo os componentes e fornecendo os dados
export const FiliaisProvider = ({ children }) => {
  const [filiais, setFiliais] = useState([]);

  //Carregando as filiais do banco de dados
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
    <FiliaisContext.Provider value={{ filiais }}>
      {children} 
    </FiliaisContext.Provider>
  );
};

//Hook
export const useFiliaisContext = () => {
  return useContext(FiliaisContext);
}


//context/StrapiProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { fetchPaginatedData } from '../services/StrapiClient';

//Cria o contexto
const StrapiContext = createContext();

export const useStrapi = () => useContext(StrapiContext);

//Abre o banco de dados SQLite
const db = SQLite.openDatabase('DataStrapi.db');

//Inicializa o banco de dados e cria as tabelas, se ainda não existirem
const initDB = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS filiais (
          codigofilial INTEGER PRIMARY KEY,
          nomefilial TEXT,
          endereco TEXT,
          numero TEXT,
          cep TEXT,
          bairro TEXT,
          nomecidade TEXT,
          numeroibge INTEGER,
          uf TEXT,
          telefone TEXT,
          gerente TEXT,
          supervisor TEXT,
          cnpj TEXT,
          horariofuncionamento TEXT,
          latitude REAL,
          longitude REAL
        )`,
        [],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};

// Função para salvar dados no banco
const saveDataToDB = (tableName, data) => {
  db.transaction(tx => {
    data.forEach(item => {
      tx.executeSql(
        `INSERT OR REPLACE INTO ${tableName} (codigofilial, nomefilial, endereco, numero, cep, bairro, nomecidade, numeroibge, uf, telefone, gerente, supervisor, cnpj, horariofuncionamento, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.codigofilial,
          item.nomefilial,
          item.endereco,
          item.numero,
          item.cep,
          item.bairro,
          item.nomecidade,
          item.numeroibge,
          item.uf,
          item.telefone,
          item.gerente,
          item.supervisor,
          item.cnpj,
          item.horariofuncionamento,
          item.latitude,
          item.longitude,
        ],
        () => console.log(`Dados salvos na tabela '${tableName}' com sucesso.`),
        (_, error) => console.error(`Erro ao salvar dados na tabela '${tableName}':`, error)
      );
    });
  });
};

//Componente do provider
export const StrapiProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndSaveToDB = async () => {
      await initDB();
      const filiais = await fetchPaginatedData('/filiais');
      saveDataToDB('filiais', filiais);
      setData(filiais);  //Guarda os dados no estado, se necessário
    };

    fetchDataAndSaveToDB();
  }, []);

  return (
    <StrapiContext.Provider value={{ data }}>
      {children}
    </StrapiContext.Provider>
  );
};

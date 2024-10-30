import React, { createContext, useContext, useEffect, useState } from 'react';
import { openDatabaseAsync } from 'expo-sqlite';
import { fetchPaginatedData } from '../services/StrapiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Cria o contexto
const StrapiContext = createContext();

export const useStrapi = () => useContext(StrapiContext);

//Inicializa o banco de dados e cria as tabelas, se ainda não existirem
const initDB = async () => {
  try {
    const db = await openDatabaseAsync('DataStrapi.db'); // Abre o banco de dados
    console.log('Banco de dados aberto com sucesso:', db);

    //Cria a tabela de filiais se não existir
    await db.execAsync(`PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS filiais (
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
      latitude TEXT,
      longitude TEXT
    );`);

    console.log('Tabela de filiais criada com sucesso!');
    return db; //Retorna o objeto db para uso posterior
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error; //Propaga o erro para o chamador
  }
};

//Função para salvar ou atualizar dados no banco
const saveDataToDB = async (db, tableName, data) => {
  try {
    //Loop pelos dados
    for (const item of data) {
      //Executa a inserção diretamente com runAsync
      await db.runAsync(
        `INSERT OR REPLACE INTO ${tableName} (codigofilial, nomefilial, endereco, numero, cep, bairro, nomecidade, numeroibge, uf, telefone, gerente, supervisor, cnpj, horariofuncionamento, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          item.codigofilial,
          item.nomefilial,
          item.endereco,
          item.numero,
          item.cep || null,
          item.bairro || null,
          item.nomecidade || null,
          item.numeroibge,
          item.uf,
          item.telefone,
          item.gerente || null,
          item.supervisor || null,
          item.cnpj || null,
          item.horariofuncionamento || null,
          item.latitude || null,
          item.longitude || null,
        ]
      );

      console.log(`Dados salvos na tabela '${tableName}' com sucesso:`, item.codigofilial);
    }

    // //Obtém todos os dados da tabela filiais e exibe no console
    // const teste = await db.getAllAsync("SELECT * FROM filiais");
    // console.log("Dados atuais na tabela 'filiais':", teste);


  } catch (error) {
    console.error("Erro ao salvar dados no banco de dados:", error.message);
  }
};

//Componente do provider
export const StrapiProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndSaveToDB = async () => {
      try {
        //Verifica se os dados já foram carregados
        const hasLoadedData = await AsyncStorage.getItem('hasLoadedData')

        if(!hasLoadedData){
          const db = await initDB(); //Inicializa o banco de dados
          const filiais = await fetchPaginatedData('/api/informacoeslojas'); //Busca os dados
          console.log("Dados recebidos com sucesso");
          await saveDataToDB(db, 'filiais', filiais); //Salva os dados no banco
          setData(filiais); //Guarda os dados no estado

          //Armazena no AsyncStorage que os dados foram carregados
          await AsyncStorage.setItem('hasLoadedData', 'true');
        }
        
      } catch (error) {
        console.error("Erro ao buscar ou salvar dados:", error);
      }
    };

    fetchDataAndSaveToDB();
  }, []);

  return (
    <StrapiContext.Provider value={{ data }}>
      {children}
    </StrapiContext.Provider>
  );
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPaginatedData } from '../services/StrapiClient';
import { initDB } from '../data/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

//Cria o contexto
const StrapiContext = createContext();

export const useStrapi = () => useContext(StrapiContext);

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
    //const teste = await db.getAllAsync("SELECT * FROM filiais");
    //console.log("Dados atuais na tabela 'filiais':", teste);


  } catch (error) {
    console.error("Erro ao salvar dados no banco de dados:", error.message);
  }
};

//Componente do provider
export const StrapiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false); //Estado para controle do registro da tarefa

  //FUNÇÃO PARA BAIXAR TODAS AS LOJAS NO PRIMEIRO CARREGAMENTO DO COMPONENTE
  const fetchDataAndSaveToDB = async (endpoint, tableName) => {
    try {
      //Verifica se os dados já foram carregados
      const hasLoadedData = await AsyncStorage.getItem(`hasLoadedData_${tableName}`);

      if(!hasLoadedData){
        const db = await initDB(); //Inicializa o banco de dados
        const filiais = await fetchPaginatedData(endpoint); //Busca os dados
        console.log("Dados recebidos com sucesso");
        await saveDataToDB(db, tableName, filiais); //Salva os dados no banco

        //Verifica os dados após o salvamento
        //const savedData = await db.getAllAsync("SELECT * FROM filiais");
        //console.log("Dados após salvamento:", savedData);

        setData(filiais); //Guarda os dados no estado

        //Armazena no AsyncStorage que os dados foram carregados
        await AsyncStorage.setItem(`hasLoadedData_${tableName}`, 'true');
      }
      
    } catch (error) {
      console.error(`Erro ao buscar ou salvar dados para a tabela ${tableName}:`, error);
    }
  };

  //FUNÇÃO PARA IR ATUALIZANDO A LOJA SE TIVER ALTERAÇÃO OU INCLUSÃO NO STRAPI
  const syncDataWithStrapi = async (endpoint, tableName) => {
    try {
      //Inicializa o banco de dados SQLite
      const db = await initDB();
      //Obtém os dados do Strapi (página de informações das lojas)
      const strapiData = await fetchPaginatedData(endpoint);
  
      for (const item of strapiData) {
        //Verifica se já existe um registro local com o código da filial correspondente
        const localData = await db.getAllAsync(`SELECT * FROM ${tableName} WHERE codigofilial = ?;`, [item.codigofilial])
  
        if (localData && localData.length > 0) {
          //Se existir um registro local, pega o primeiro item (deve ser único por codigofilial)
          const localItem = localData[0];
  
          //Compara os campos do item vindo do Strapi com o registro local
          const differences = Object.keys(item).filter((key) => {
            //Se o campo não existir no item local, ignora
            if (!(key in localItem)) return false;
  
            //Obtém os valores do item vindo do Strapi e o valor do item local
            const itemValue = item[key];
            const localValue = localItem[key];
  
            //Faz uma comparação genérica (usando JSON.stringify) para verificar se os valores são diferentes
            return JSON.stringify(itemValue) !== JSON.stringify(localValue);
          });

          //Se forem detectadas diferenças nos dados, faz o update no banco de dados local
          if (differences.length > 0) {
            console.log(`Mudanças detectadas para ${item.codigofilial} na tabela ${tableName}:`, differences);

  
            await db.runAsync(
              `UPDATE ${tableName} SET 
                nomefilial = ?, endereco = ?, numero = ?, cep = ?, bairro = ?, nomecidade = ?, 
                numeroibge = ?, uf = ?, telefone = ?, gerente = ?, supervisor = ?, cnpj = ?, 
                horariofuncionamento = ?, latitude = ?, longitude = ?, last_modified = CURRENT_TIMESTAMP 
              WHERE codigofilial = ?;`,
              [
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
                item.codigofilial,
              ]
            );
          } else {
            console.log(`Nenhuma mudança detectada para: ${item.codigofilial}`);
          }
        } else {
          console.log(`Inserindo novo registro na tabela ${tableName}: ${item.codigofilial}`);
          await db.runAsync(
            `INSERT INTO ${tableName} (
              codigofilial, nomefilial, endereco, numero, cep, bairro, nomecidade, numeroibge, uf, telefone, 
              gerente, supervisor, cnpj, horariofuncionamento, latitude, longitude, last_modified
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
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
        }
      }
    } catch (error) {
      console.error(`Erro ao sincronizar dados da tabela ${tableName} com o endpoint ${endpoint}:`, error);
    }
  };
  
  //Função para configurar o BackgroundFetch
  const configureBackgroundFetch = async () => {
    try {
      //Registra a tarefa apenas se não estiver registrada
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
      if (!isRegistered) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
          minimumInterval: 1440, //24 horas
          stopOnTerminate: false, //continua após o app ser fechado
          startOnBoot: true, //inicia após o reinício do dispositivo
        });
        setIsRegistered(true); //Atualiza o estado de registro
        console.log('Background fetch configurado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao configurar BackgroundFetch', error);
    }
  };

  //Define a tarefa de BackgroundFetch
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
      console.log('Background Fetch acionado');
      await syncDataWithStrapi();
      BackgroundFetch.finish(BackgroundFetch.BackgroundFetchResult.NewData);  //Marca a tarefa como concluída com sucesso
    } catch (error) {
      console.error('Erro no Background Fetch', error);
      BackgroundFetch.finish(BackgroundFetch.BackgroundFetchResult.Failed);  //Marca a tarefa como falha
    }
  });
 
  
  useEffect(() => {
    fetchDataAndSaveToDB('/informacoeslojas', 'filiais');

    configureBackgroundFetch(); //Configura o BackgroundFetch

    return () => {
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK); //Cancela a tarefa ao desmontar o componente
    };
  }, []);

  return (
    <StrapiContext.Provider value={{ data }}>
      {children}
    </StrapiContext.Provider>
  );
};
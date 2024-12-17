import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPaginatedData } from '../services/StrapiClient';
import { initDB, saveDataToDB } from '../data/db';
import { syncDataWithStrapi } from './SyncDataWithStrapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

//Cria o contexto
const StrapiContext = createContext();

export const useStrapi = () => useContext(StrapiContext);

//Componente do provider
export const StrapiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false); //Estado para controle do registro da tarefa

  //FUNÇÃO PARA BAIXAR TODAS AS LOJAS NO PRIMEIRO CARREGAMENTO DO COMPONENTE
  const fetchDataAndSaveToDB = async (configs) => {
    try {
      const db = await initDB(); //Inicializa o banco de dados

      for (const { endpoint, tableName, columns } of configs) {
        const hasLoadedData = await AsyncStorage.getItem(`hasLoadedData_${tableName}`);

        if (!hasLoadedData) {
          const dataFromStrapi = await fetchPaginatedData(endpoint); //Busca os dados
          //console.log(`Dados recebidos do endpoint ${endpoint} para a tabela ${tableName}`);
          await saveDataToDB(db, tableName, dataFromStrapi, columns); //Salva os dados no banco

          setData((prevData) => ({
            ...prevData,
            [tableName]: dataFromStrapi,
          })); //Atualiza o estado

          await AsyncStorage.setItem(`hasLoadedData_${tableName}`, 'true'); //Marca como carregado
        }
      }
    } catch (error) {
      console.error('Erro ao buscar ou salvar dados no banco:', error);
    }
  };

  //Função para configurar o BackgroundFetch
  const configureBackgroundFetch = async () => {
    try {
      //Registra a tarefa apenas se não estiver registrada
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
      if (!isRegistered) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
          minimumInterval: 86400, //24 horas
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
      const tableConfigs = [
        { endpoint: '/informacoeslojas', tableName: 'filiais' },
        //{ endpoint: '/chamados', tableName: 'chamados' },
        { endpoint: '/pontos-ifoods', tableName: 'pontosIfoods' },
        { endpoint: '/pontos-abastecimentos', tableName: 'pontosAbastecimentos' },
      ];
      
      //Loop para sincronizar cada tabela
      for (const config of tableConfigs) {
        const { endpoint, tableName } = config;
        console.log(`Sincronizando dados da tabela ${tableName}...`);
        await syncDataWithStrapi(endpoint, tableName);
      }

      BackgroundFetch.finish(BackgroundFetch.BackgroundFetchResult.NewData);  //Marca a tarefa como concluída com sucesso
    } catch (error) {
      console.error('Erro no Background Fetch', error);
      BackgroundFetch.finish(BackgroundFetch.BackgroundFetchResult.Failed);  //Marca a tarefa como falha
    }
  });
 
  
  useEffect(() => {
    const tableConfigs = [
      {
        endpoint: '/informacoeslojas',
        tableName: 'filiais',
        keyField: 'codigofilial', //Campo chave
        columns: [
          'codigofilial', 'nomefilial', 'endereco', 'numero', 'cep', 'bairro',
          'nomecidade', 'numeroibge', 'uf', 'telefone', 'gerente', 'supervisor',
          'cnpj', 'horariofuncionamento', 'latitude', 'longitude'
        ],
      },
      {
        endpoint: '/pontos-ifoods',
        tableName: 'pontosIfoods',
        keyField: 'latitude', //Campo chave
        columns: ['latitude', 'longitude', 'descricao'],
      },
      {
        endpoint: '/pontos-abastecimentos',
        tableName: 'pontosAbastecimentos',
        keyField: 'latitude', //Campo chave
        columns: ['latitude', 'longitude', 'descricao'],
      },
    ];

    fetchDataAndSaveToDB(tableConfigs);

    configureBackgroundFetch(tableConfigs); //Configura o BackgroundFetch

    return () => {
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK); //Cancela a tarefa ao desmontar o componente
    };

    // //Testar a função syncDataWithStrapi a cada 1 minuto
    // const intervalId = setInterval(async () => {
    //   for (const config of tableConfigs) {
    //     const { endpoint, tableName, keyField, columns } = config;
    //     console.log(`Sincronizando dados da tabela ${tableName}...`);
    //     await syncDataWithStrapi(endpoint, tableName, keyField, columns);
    //   }
    // }, 20000); // 60000 ms = 1 minuto

    // return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, []);

  return (
    <StrapiContext.Provider value={{ data }}>
      {children}
    </StrapiContext.Provider>
  );
};
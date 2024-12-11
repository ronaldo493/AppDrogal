import { openDatabaseAsync } from 'expo-sqlite';

//Função para criar a tabela de Filiais
const createFiliaisTable = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS filiais (
        codigofilial INTEGER PRIMARY KEY,
        nomefilial TEXT,
        endereco TEXT,
        numero TEXT,
        cep TEXT,
        bairro TEXT,
        nomecidade TEXT,
        numeroibge TEXT,
        uf TEXT,
        telefone TEXT,
        gerente TEXT,
        supervisor TEXT,
        cnpj TEXT,
        horariofuncionamento TEXT,
        latitude TEXT,
        longitude TEXT,
        last_modified TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabela filiais criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabela filiais:', error);
  }
};

//Função para criar a tabela de Chamados
const createChamadosTable = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS chamados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sequencia INTEGER,
        situacao INTEGER,
        descricaosituacao TEXT,
        usuarioabertura INTEGER,
        nomeabertura TEXT,
        setorabertura INTEGER,
        descricaosetorabertura TEXT,
        usuarioresponsavel INTEGER,
        nomeresponsavel TEXT,
        setor INTEGER,
        descricaosetorresponsavel TEXT,
        titulo TEXT,
        descricao TEXT,
        filial INTEGER,
        nomefilial TEXT,
        dataabertura TEXT,
        dataultimainteracao TEXT,
        datafinalizacao TEXT,
        nota INTEGER,
        notaaceitavel INTEGER,
        comentarionota TEXT,
        dataprevisao TEXT,
        dataprimeirainteracaoatendimento TEXT,
        dataultimainteracaoaguardandoresposta TEXT,
        codigocategoria INTEGER,
        categoriachamado TEXT,
        dataultimainteracaoaguardandofinalizacao TEXT,
        dataprimeirainteracaoaguardandofinalizacao TEXT
      );
    `);
    console.log('Tabela chamados criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabela chamados:', error);
  }
};

// Função para inicializar o banco de dados e criar as tabelas
export const initDB = async () => {
  try {
    const db = await openDatabaseAsync('DataStrapi.db'); //Abre o banco de dados
    console.log('Banco de dados aberto com sucesso:', db);

    //Criação das tabelas
    await createFiliaisTable(db);
    await createChamadosTable(db);

    return db; //Retorna o objeto db para uso posterior
  } catch (error) {
    console.error('Erro ao abrir ou inicializar o banco de dados:', error);
    throw error; //Propaga o erro para o chamador
  }
};



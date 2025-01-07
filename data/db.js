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
    // console.log('Tabela filiais criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabela filiais:', error);
  }
};

// //Função para criar a tabela de Chamados
// const createChamadosTable = async (db) => {
//   try {
//     await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS chamados (
//         sequencia INTEGER,
//         situacao INTEGER,
//         descricaosituacao TEXT,
//         usuarioabertura INTEGER,
//         nomeabertura TEXT,
//         setorabertura INTEGER,
//         descricaosetorabertura TEXT,
//         usuarioresponsavel INTEGER,
//         nomeresponsavel TEXT,
//         setor INTEGER,
//         descricaosetorresponsavel TEXT,
//         titulo TEXT,
//         descricao TEXT,
//         filial INTEGER,
//         nomefilial TEXT,
//         dataabertura TEXT,
//         dataultimainteracao TEXT,
//         datafinalizacao TEXT,
//         nota INTEGER,
//         notaaceitavel INTEGER,
//         comentarionota TEXT,
//         dataprevisao TEXT,
//         dataprimeirainteracaoatendimento TEXT,
//         dataultimainteracaoaguardandoresposta TEXT,
//         codigocategoria INTEGER,
//         categoriachamado TEXT,
//         dataultimainteracaoaguardandofinalizacao TEXT,
//         dataprimeirainteracaoaguardandofinalizacao TEXT,
//         last_modified TEXT DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log('Tabela chamados criada com sucesso!');
//   } catch (error) {
//     console.error('Erro ao criar tabela chamados:', error);
//   }
// };

//Função para criar a tabela de pontosIfoods
const createPontosIfoodsTable = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS pontosIfoods (
        latitude TEXT,
        longitude TEXT,
        descricao TEXT,
        last_modified TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    // console.log('Tabela pontosIfoods criada com sucesso!');
  } catch (error) {
    // console.error('Erro ao criar tabela pontos:', error);
  }
};

//Função para criar a tabela de pontosAbastecimentos
const createPontosAbastecimentosTable = async (db) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS pontosAbastecimentos (
        latitude TEXT,
        longitude TEXT,
        descricao TEXT,
        last_modified TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    // console.log('Tabela pontosAbastecimentos criada com sucesso!');
  } catch (error) {
    // console.error('Erro ao criar tabela pontos:', error);
  }
};

//Função para inicializar o banco de dados e criar as tabelas
export const initDB = async () => {
  try {
    const db = await openDatabaseAsync('DataStrapi.db'); //Abre o banco de dados
    // console.log('Banco de dados aberto com sucesso:', db);

    //Criação das tabelas
    await createFiliaisTable(db);
    // await createChamadosTable(db);
    await createPontosIfoodsTable(db);
    await createPontosAbastecimentosTable(db);

    return db; //Retorna o objeto db para uso posterior
  } catch (error) {
    console.error('Erro ao abrir ou inicializar o banco de dados:', error);
    throw error; //Propaga o erro para o chamador
  }
};

//Função genérica para salvar ou atualizar dados no banco
export const saveDataToDB = async (db, tableName, data, columns) => {
  try {
    //Monta a string de colunas e os placeholders (?)
    const columnNames = columns.join(', ');
    const placeholders = columns.map(() => '?').join(', ');

    //Monta a query SQL genérica
    const query = `INSERT OR REPLACE INTO ${tableName} (${columnNames}) VALUES (${placeholders});`;

    //Loop pelos dados
    for (const item of data) {
      //Cria um array com os valores nas mesmas posições das coluna
      const values = columns.map((col) => item[col] || null);

      //Executa a inserção diretamente com runAsync
      await db.runAsync(query, values);

      // console.log(`Dados salvos na tabela '${tableName}' com sucesso:`);
    }

  } catch (error) {
    console.error(`Erro ao salvar dados na tabela '${tableName}':`, error.message);
  }
};



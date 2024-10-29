import * as SQLite from 'expo-sqlite';

// Função para abrir o banco
const openDatabase = () => {
   return SQLite.openDatabase('DataStrapi.db');
};

// Função para iniciar o banco
const initDB = async () => {
   const db = openDatabase(); // Corrigido: remove o async e o await aqui

   // Criação da tabela filiais
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
         () => {
            console.log("Tabela 'filiais' criada com sucesso.");
         },
         (tx, error) => {
            console.error("Erro ao criar tabela 'filiais':", error);
         }
      );
   });

   // Criação da tabela de telefone
   db.transaction(tx => {
      tx.executeSql(
         `CREATE TABLE IF NOT EXISTS telefone (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            departamento TEXT,
            colaboradores TEXT,
            ramal TEXT,
            ddr TEXT,
            sequencia INTEGER,
            topico TEXT,
            exibirloja INTEGER,
            email TEXT
         )`,
         [],
         () => {
            console.log("Tabela 'telefones' criada com sucesso.");
         },
         (tx, error) => {
            console.error("Erro ao criar tabela 'telefones':", error);
         }
      );
   });

   // Criação da tabela de preventiva
   db.transaction(tx => {
      tx.executeSql(
         `CREATE TABLE IF NOT EXISTS preventiva (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filial INTEGER,
            colaboradores TEXT,
            gerente TEXT,
            assGerente TEXT
         )`, // Removido a vírgula extra
         [],
         () => {
            console.log("Tabela 'preventiva' criada com sucesso.");
         },
         (tx, error) => {
            console.error("Erro ao criar tabela 'preventiva':", error);
         }
      );
   });

   // Criação da tabela de chamados
   db.transaction(tx => {
      tx.executeSql(
         `CREATE TABLE IF NOT EXISTS chamados (
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
         )`,
         [],
         () => {
            console.log("Tabela 'chamados' criada com sucesso.");
         },
         (tx, error) => {
            console.error("Erro ao criar tabela 'chamados':", error);
         }
      );
   });
};

// Chame a função initDB para iniciar o banco
initDB();

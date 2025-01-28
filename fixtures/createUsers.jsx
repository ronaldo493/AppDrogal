const axios = require('axios');

//Configuração do token e URL da API
const apiUrl = 'http://suporteappdrogal.ddns.com.br:18083/api/users';
const token = '9daa01c9a2a011d52e3be0dadafe720ee349c7d77707081c0d9db457662f0a71db6b9c929ba3a813afe67fd0d49216ddbccfd773e5bfd1f0ca9fb9cfeb5ae0f1e7fee4712f24049e0be73433593f42a11ac9701394cd44d787ccd42ca324ed0b2a31b530c3b119b6db4905a41b05b339ba5ca21d0da42417e1224b69184e1055';

//Dados da tabela Usuário Corporativo
const corporateUsers = [
  {
    "codigousuario":8394,
    "nome":"ALEXANDRE DOS REIS ARAUJO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1004,
    "nome":"ANGELA RODRIGUES",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1324,
    "nome":"ANTONIO BATISTA DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":10733,
    "nome":"ANTONIO FRAZAO FILHO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":15253,
    "nome":"CARLOS HENRIQUE BISPO DE ARAUJO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":8390,
    "nome":"CLAYTON FILIPE DOS REIS LIMA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":143,
    "nome":"DANILO GENARO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":7464,
    "nome":"EDSON NOGUEIRA DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":12296,
    "nome":"EDSON SOARES SANTANA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":17020,
    "nome":"EVERALDO CAETANO LOPES JUNIOR",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1323,
    "nome":"FRANCISCO CLAUDIO PIRES DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1322,
    "nome":"FRANCISCO ROMARIO LIMA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":16717,
    "nome":"GEAN MARCOS PELISSARI",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1376,
    "nome":"GERALDO FRANCISCO DE MOURA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1317,
    "nome":"GERSON APARECIDO CLARO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":16220,
    "nome":"GUILHERME DE MORAES",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":12608,
    "nome":"GUILHERME PIRES RIBEIRO ALVES",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1325,
    "nome":"ISAIAS GOMES DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":909,
    "nome":"JAILSON DA SILVA HONORIO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":14762,
    "nome":"JEFFERSON WILLIAM NICARETTE",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":7466,
    "nome":"JONATAS FILARDI ANDRADE",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1501,
    "nome":"KALEK NATHA RUFINO GOMES",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":11471,
    "nome":"LARISSA DE CAMPOS RONCHESELE",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":8389,
    "nome":"LOURIVAL DE JESUS FRANCO DE CAMPOS",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":15818,
    "nome":"LUCAS DEROLDO CARVALHO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1320,
    "nome":"LUCIO PEREIRA DO NASCIMENTO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1321,
    "nome":"LUIS HENRIQUE DA SILVA GONCALVES",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":11647,
    "nome":"LUIS MULLER SOUZA DA CRUZ",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":11823,
    "nome":"LUIZ FERNANDO DA COSTA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1319,
    "nome":"LUIZ FERNANDO SIMAO RODRIGUES",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":904,
    "nome":"MARCOS JOSE DE SOUZA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":16913,
    "nome":"MATHEUS JANUARIO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":1375,
    "nome":"MOISES ESDRAS DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":16718,
    "nome":"RONILSON MENDES DOS SANTOS",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":15341,
    "nome":"THAIS MARCON GOBBO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":17775,
    "nome":"TONY RAMON MARCONATTO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":16300,
    "nome":"VINICIUS LEONARDO ALECRIM DE S SANTOS",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":12609,
    "nome":"VITAL GENESIO DA SILVA FILHO",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":11020,
    "nome":"WILLIAM PAULO DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":14051,
    "nome":"ZAQUEU FERNANDO DA SILVA",
    "codigosetor":31,
    "descricaosetor":"ENGENHARIA"
 },
 {
    "codigousuario":7465,
    "nome":"ADRIANO TURIBIO",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":1071,
    "nome":"ALEXANDRE DA SILVA ALVES",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":12813,
    "nome":"FELIPE CESAR PASSOS FERNANDES",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":10054,
    "nome":"FELIPE MELO DE MATOS",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":8680,
    "nome":"GUSTAVO HENRIQUE DA SILVA PLENS",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":7438,
    "nome":"GUSTAVO HENRIQUE RAMOS DE JESUS",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":12295,
    "nome":"JULIO APARECIDO MARIANO",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":15225,
    "nome":"LUCAS RODOLFO RICARTE",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":9812,
    "nome":"MATHEUS GOMES DE SOUZA",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":8337,
    "nome":"VICTOR SANTOS DE OLIVEIRA",
    "codigosetor":106,
    "descricaosetor":"TI - INFRAESTRUTURA"
 },
 {
    "codigousuario":755,
    "nome":"DIEGO VIEIRA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":15224,
    "nome":"FABIO ALEXANDRE PRETEL JUNIOR",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":1054,
    "nome":"GUILHERME URBANO CASELLA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":640,
    "nome":"GUSTAVO DIAS ALVES",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":11981,
    "nome":"GUSTAVO SIMPLICIO DE LIMA SILVA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":7689,
    "nome":"IGOR VINICIUS DA SILVA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":15593,
    "nome":"JOAO MATHEUS VIEIRA LISBOA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":1567,
    "nome":"KEVIN CHAGAS DE OLIVEIRA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":10141,
    "nome":"LUCAS GABRIEL MAXIMO",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":1395,
    "nome":"LUCAS SANTOS FERREIRA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":749,
    "nome":"MARCELO ADRIANO FRANCO",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":15011,
    "nome":"MARCUS VINICIUS IZEQUIEL DE PASSOS",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":15634,
    "nome":"MATHEUS NOVELLO MORAES",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":15462,
    "nome":"PAULO DUARTE BOSCARIOL FILHO",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":8392,
    "nome":"RONALDO VIEIRA DA SILVA",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 },
 {
    "codigousuario":17937,
    "nome":"JOAO VICTOR RODRIGUES TONIOLO",
    "codigosetor":30,
    "descricaosetor":"TI - SUPORTE"
 }
];

//Função para criar usuários no Strapi
const createUsers = async () => {
  for (const user of corporateUsers) {
    //Preparar os dados do novo usuário
    const userData = {
      username: user.nome, //Usando o nome do usuário corporativo
      email: `${user.codigousuario}@drogal.com.br`, //Gerando email
      password: 'drogal', //Defina uma senha padrão
      confirmed: false, //Confirmação do usuário
      role: 3, //ID 
      setor: user.descricaosetor

      //5 Infraestrutura
      //4 Engenharia
      //3 Suporte
    };

    try {
      console.log(`Criando usuário: ${userData.username}, Email: ${userData.email}`);

      const response = await axios.post(apiUrl, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`Usuário ${userData.username} criado com sucesso:`, response.data);
    } catch (error) {
      console.error(`Erro ao criar usuário ${userData.username}:`, error.response ? error.response.data : error.message);
    }
  }
};

//Executar a função
createUsers();

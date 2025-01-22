import axios from 'axios';
import axiosRetry from 'axios-retry';

//URL base da API Strapi
const BASE_URL = 'http://suporteappdrogal.ddns.com.br:18083/api';

//Token de autenticação
const API_TOKEN = '9daa01c9a2a011d52e3be0dadafe720ee349c7d77707081c0d9db457662f0a71db6b9c929ba3a813afe67fd0d49216ddbccfd773e5bfd1f0ca9fb9cfeb5ae0f1e7fee4712f24049e0be73433593f42a11ac9701394cd44d787ccd42ca324ed0b2a31b530c3b119b6db4905a41b05b339ba5ca21d0da42417e1224b69184e1055';


//Função para criar o cliente Axios
export const createApiClientStrapi = () => {

  const conexao = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  axiosRetry(conexao, { retries: 4 });

  return conexao;
};

//Função para obter a conexão

const strapiClient = () => {

  return createApiClientStrapi();

};

export default strapiClient;

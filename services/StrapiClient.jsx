import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useAuthContext } from '../context/AuthContext';

//URL base da API Strapi
const BASE_URL = 'http://suporteappdrogal.ddns.com.br:18083/api';

//Função para criar o cliente Axios
export const createApiClientStrapi = () => {
  const authStrapi = useAuthContext();
  const conexao = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${authStrapi.token}`,
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

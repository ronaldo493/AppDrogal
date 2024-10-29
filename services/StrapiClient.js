//services/StrapiClient.js

import axios from 'axios';

//URL base da API Strapi
const BASE_URL = 'https://seu-endereco-strapi.com/api';

//Função para buscar dados paginados
export const fetchPaginatedData = async (endpoint, pageSize = 100) => {
  let allData = [];
  let page = 1;
  let hasMore = true;

  try {
    //Enquanto tiver mais dados para buscar
    while (hasMore) {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
          pagination: {
            page,
            pageSize,
          },
        },
      });

      const { data, meta } = response.data;
      allData = [...allData, ...data];

      //Verifica se há mais páginas
      hasMore = meta.pagination.page < meta.pagination.pageCount;
      page += 1;
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API Strapi:', error);
  }

  return allData;
};

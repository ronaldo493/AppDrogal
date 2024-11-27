import axios from 'axios';

//URL base da API Strapi
const BASE_URL = 'http://suporteappdrogal.ddns.com.br:18083/api/informacoeslojas';


//Função para buscar dados paginados
export const fetchPaginatedData = async (endpoint, pageSize = 100) => {
  let allData = [];
  let page = 1;
  let hasMore = true;

  try {
    //Enquanto tiver mais dados para buscar
    while (hasMore) {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          pagination: {
            page,
            pageSize,
          },
        },
        headers: {
          Authorization: `Bearer 9daa01c9a2a011d52e3be0dadafe720ee349c7d77707081c0d9db457662f0a71db6b9c929ba3a813afe67fd0d49216ddbccfd773e5bfd1f0ca9fb9cfeb5ae0f1e7fee4712f24049e0be73433593f42a11ac9701394cd44d787ccd42ca324ed0b2a31b530c3b119b6db4905a41b05b339ba5ca21d0da42417e1224b69184e1055`,
        },
      });

      const { data, meta } = response.data;
      allData = [...allData, ...data];

      // Verifica se há mais páginas
      hasMore = meta.pagination.page < meta.pagination.pageCount;
      page += 1;
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API Strapi:', error);
    throw error;
  }

  return allData;
};

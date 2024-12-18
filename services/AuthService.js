import { api } from './StrapiClient';

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/local', {
      identifier: username, //O Strapi usa 'identifier' para username ou email
      password,
    });
    const { jwt, user } = response.data;
    return { token: jwt, ...user };
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
    return null;
  }
};

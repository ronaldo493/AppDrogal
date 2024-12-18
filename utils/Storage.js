import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover token:', error);
  }
};

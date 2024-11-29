import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import SearchBarStyles from './styles/SearchBarStyles';
import { useTheme } from './ThemeContext';
import { getThemeStyles } from './styles/ThemeStyles';
import { openDatabaseAsync } from 'expo-sqlite';
import { Keyboard } from 'react-native';

export default function SearchBar({ onAddRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilial, setSelectedFilial] = useState(null);
  const [db, setDb] = useState(null);

  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

 //Função para abrir o banco de dados
 const openDatabase = async () => {
  try {
    const database = await openDatabaseAsync('DataStrapi.db');
    console.log('Banco de dados aberto com sucesso:', database);
    setDb(database); //Armazena o banco de dados no estado
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
  }
};

useEffect(() => {
  //Abre o banco de dados ao montar o componente
  openDatabase(); 
}, []);

//Função para buscar filial no banco de dados usando o código de filial
const handleSearch = async (text) => {
  setSearchTerm(text);

  if (text.trim() === '') {
      setSelectedFilial(null);
      return;
  }

  const codigoFilial = parseInt(text, 10);

  if (db) { //Verifica se o banco de dados está aberto
      try {
          //Busca todas as filiais e filtra pelo código da filial
          const rows = await db.getAllAsync('SELECT * FROM filiais WHERE codigofilial = ?', [codigoFilial]);

          if (rows.length > 0) {
              setSelectedFilial(rows[0]); //Define a filial encontrada
              console.log('Filial encontrada:', rows[0]);
          } else {
              console.log('Nenhuma filial encontrada com o código:', codigoFilial);
              setSelectedFilial(null);
          }
      } catch (error) {
          console.error('Erro ao buscar filial:', error);
          setSelectedFilial(null);
      }
  } else {
      console.error('Banco de dados não está aberto.');
  }
};


  //Função que lida com a Seleção da Filial
  const handleSelectFilial = () => {
    if (selectedFilial) {
      onAddRoute(selectedFilial);
      setSearchTerm('');
      setSelectedFilial(null);
      Keyboard.dismiss(); //Fecha o teclado
    }
  };

  return (
    <View>
      <View style={SearchBarStyles.searchContainer}>
        <TextInput
          style={[SearchBarStyles.input, themeStyles.input]}
          placeholder="DIGITE O NÚMERO DA FILIAL"
          placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
          value={searchTerm}
          keyboardType="numeric"
          onChangeText={handleSearch}
        />
      </View>
      {selectedFilial && (
        <View style={SearchBarStyles.suggestionContainer}>
          <View style={[SearchBarStyles.suggestionItem, themeStyles.listSearch]}>
            <Text style={[themeStyles.text, SearchBarStyles.text]}>Código: {selectedFilial.codigofilial}</Text>
            <Text style={[themeStyles.text, SearchBarStyles.text]}>Nome: {selectedFilial.nomefilial}</Text>
            <Text style={[themeStyles.text, SearchBarStyles.text]}>Endereço: {selectedFilial.endereco}, {selectedFilial.numero}</Text>
            <Text style={[themeStyles.text, SearchBarStyles.text]}>Bairro: {selectedFilial.bairro}</Text>
            <Text style={[themeStyles.text, SearchBarStyles.text]}>Telefone: {selectedFilial.telefone}</Text>
            <Text style={[themeStyles.text, SearchBarStyles.text]}>CNPJ: {selectedFilial.cnpj}</Text>
          </View>
          <View style={SearchBarStyles.buttonContainer}>
            <Button title="Adicionar" onPress={handleSelectFilial}  />
          </View>
        </View>
      )}
    </View>
  );
}

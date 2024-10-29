import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import SearchBarStyles from './styles/SearchBarStyles';
import { useTheme } from './ThemeContext';
import { getThemeStyles } from './styles/ThemeStyles';

//Abre o banco de dados usando expo-sqlite
const db = SQLite.openDatabase('DataStrapi.db');

export default function SearchBar({ onAddRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilial, setSelectedFilial] = useState(null);

  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  //Função para buscar filial no banco de dados usando o código de filial
  const handleSearch = (text) => {
    setSearchTerm(text);

    if (text.trim() === '') {
      setSelectedFilial(null);
      return;
    }

    const codigoFilial = parseInt(text, 10);

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM filiais WHERE codigofilial = ?',
        [codigoFilial],
        (_, { rows }) => {
          if (rows.length > 0) {
            setSelectedFilial(rows.item(0));
          } else {
            setSelectedFilial(null);
          }
        },
        (error) => {
          console.error('Erro ao buscar filial:', error);
          setSelectedFilial(null);
        }
      );
    });
  };

  //Função que lida com a Seleção da Filial
  const handleSelectFilial = () => {
    if (selectedFilial) {
      onAddRoute(selectedFilial);
      setSearchTerm('');
      setSelectedFilial(null);
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
            <Button title="Adicionar" onPress={handleSelectFilial} />
          </View>
        </View>
      )}
    </View>
  );
}

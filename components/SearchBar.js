import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import SearchBarStyles from './styles/SearchBarStyles';
import { useTheme } from './ThemeContext';
import { getThemeStyles } from './styles/ThemeStyles';
import { Keyboard } from 'react-native';
import  useFiliais  from '../hooks/buscarFiliais';
import debounce from 'lodash.debounce';

export default function SearchBar({ onAddRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilial, setSelectedFilial] = useState(null);

  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);
  
  //Lista Filiais
  const { filiais = [] } = useFiliais();

  //Função para buscar filial na lista local usando o código de filial
  const searchFilial = (text) => {
    setSearchTerm(text);

    if (text.trim() === '') {
      setSelectedFilial(null);
      return;
    }

    const codigoFilial = parseInt(text, 10);
    const filialEncontrada = filiais.find((filial) => filial.codigofilial === codigoFilial);

    if (filialEncontrada) {
      setSelectedFilial(filialEncontrada); //Define a filial encontrada
      console.log('Filial encontrada:', filialEncontrada);
    } else {
      console.log('Nenhuma filial encontrada com o código:', codigoFilial);
      setSelectedFilial(null);
    }
  };

  //Função debounce para evitar buscas excessivas
  const debouncedSearch = useCallback(
    debounce((text) => {
      searchFilial(text); //Chama a função de busca
    }, 400), //400ms de espera após o último caractere digitado
    [filiais] //Recria a função debounce apenas se a lista de filiais mudar
  );

  //Função para atualizar o texto de busca
  const handleSearch = (text) => {
    setSearchTerm(text);
    debouncedSearch(text);  //Chama a função de debounce
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

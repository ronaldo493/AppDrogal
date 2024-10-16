import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import filiais from '../data/filiais.json';
import SearchBarStyles from './styles/SearchBarStyles';
import { useTheme } from './ThemeContext'; 
import { getThemeStyles } from './styles/ThemeStyles'; 

export default function SearchBar({ onAddRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilial, setSelectedFilial] = useState(null);

  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  //Função que lida com a BUSCA
  const handleSearch = (text) => {
    setSearchTerm(text);
    const selected = filiais.find(filial => filial.codigofilial.toString() === text);
    if (selected) {
      setSelectedFilial(selected);
    } else {
      setSelectedFilial(null);
    }
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
                <Text style={themeStyles.text}>Código: {selectedFilial.codigofilial}</Text>
                <Text style={themeStyles.text}>Nome: {selectedFilial.nomefilial}</Text>
                <Text style={themeStyles.text}>Endereço: {selectedFilial.endereco}, {selectedFilial.numero}</Text>
                <Text style={themeStyles.text}>Telefone: {selectedFilial.telefone}</Text>
                <Text style={themeStyles.text}>CNPJ: {selectedFilial.cnpj}</Text>
            </View>
            <View style={SearchBarStyles.buttonContainer}>
                <Button title="Adicionar" onPress={handleSelectFilial} />
            </View>
      </View>
      )}
    </View>
  );
}


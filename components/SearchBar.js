import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
// import filiais from '../data/filiais.json';
import SearchBarStyles from './styles/SearchBarStyles';
import { useTheme } from './ThemeContext'; 
import { getThemeStyles } from './styles/ThemeStyles'; 

export default function SearchBar({ onAddRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilial, setSelectedFilial] = useState(null);
  const [filiais, setFiliais] = useState([]);

  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  //Função para buscar dados das filiais no Strapi
  const fetchFiliais = async () => {
    try {
      const response = await fetch('http://suporteappdrogal.ddns.com.br:18083/api/informacoeslojas', {
        headers: {
          'authorization':'bearer 9daa01c9a2a011d52e3be0dadafe720ee349c7d77707081c0d9db457662f0a71db6b9c929ba3a813afe67fd0d49216ddbccfd773e5bfd1f0ca9fb9cfeb5ae0f1e7fee4712f24049e0be73433593f42a11ac9701394cd44d787ccd42ca324ed0b2a31b530c3b119b6db4905a41b05b339ba5ca21d0da42417e1224b69184e1055',
          'Content-Type': 'application/json'
        }
      })
      
      const result = await response.json();
      const data = result.data || [];
      setFiliais(data);
    } catch (error) {
      console.error('Erro ao buscar dados das filiais:', error);
    }
  };

  useEffect(() => {
    fetchFiliais();
  }, []);

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


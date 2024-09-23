import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import filiais from '../data/filiais.json';
import SearchBarStyles from './styles/SearchBarStyles';

export default function SearchBar({ onAddRoute }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilial, setSelectedFilial] = useState(null);

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
          style={SearchBarStyles.input}
          placeholder="DIGITE O NÚMERO DA FILIAL"
          value={searchTerm}
          keyboardType="numeric"
          onChangeText={handleSearch}
        />
      </View>
      {selectedFilial && (
        <View style={SearchBarStyles.suggestionContainer}>
            <View style={SearchBarStyles.suggestionItem}>
                <Text>Código: {selectedFilial.codigofilial}</Text>
                <Text>Nome: {selectedFilial.nomefilial}</Text>
                <Text>Endereço: {selectedFilial.endereco}, {selectedFilial.numero}</Text>
                <Text>Telefone: {selectedFilial.telefone}</Text>
                <Text>CNPJ: {selectedFilial.cnpj}</Text>
            </View>
            <View style={SearchBarStyles.buttonContainer}>
                <Button title="Adicionar" onPress={handleSelectFilial} />
            </View>
      </View>
      )}
    </View>
  );
}


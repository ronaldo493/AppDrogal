import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import RouteListStyles from './styles/RouteListStyles';

export default function RouteList({ routes, onRemoveRoute }) {
  //Renderenização de cada Item da Lista
  const renderItem = ({ item }) => (
    <View style={RouteListStyles.routeItem}>
      <Text>{item.nomefilial}</Text>
      <TouchableOpacity onPress={() => onRemoveRoute(item)}>
        <Text style={RouteListStyles.removeButton}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  //Exibição da Lista
  return (
    <FlatList
      data={routes}
      keyExtractor={(item) => item.codigofilial.toString()} // Usa o código da filial como chave
      renderItem={renderItem}
      style={RouteListStyles.list}
    />
  );
}

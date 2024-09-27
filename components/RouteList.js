import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import RouteListStyles from './styles/RouteListStyles';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default function RouteList({ routes, onRemoveRoute }) {
  //Renderenização de cada Item da Lista
  const renderItem = ({ item }) => (
    <View style={RouteListStyles.routeItem}>
      <Text>{item.nomefilial}</Text>
      <TouchableOpacity onPress={() => onRemoveRoute(item)}>
        <Icon name="delete" size={25} color="#cc0000"></Icon>
      </TouchableOpacity>
    </View>
  );

  //Exibição da Lista
  return (
    <FlatList
      data={routes}
      keyExtractor={(item) => item.codigofilial.toString()} //Usa o código da filial como chave
      renderItem={renderItem}
      style={RouteListStyles.list}
    />
  );
}

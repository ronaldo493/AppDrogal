import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import RouteListStyles from './styles/RouteListStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles';  

export default function RouteList({ routes, onRemoveRoute }) {
  //Modo escuro
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);
  
  //Renderenização de cada Item da Lista
  const renderItem = ({ item }) => (
    <View style={[RouteListStyles.routeItem, themeStyles.listRoutes]}>
      <Text>{item.nomefilial}</Text>
      <TouchableOpacity onPress={() => onRemoveRoute(item)}>
      <Icon name="delete" size={25} color={isDarkMode ? '#990000' : '#cc0000'} />
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

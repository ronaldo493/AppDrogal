import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SidebarStyles from './styles/SidebarStyles'; // Estilos personalizados

export default function Sidebar({ navigation }) {
  return (
    <View style={SidebarStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={SidebarStyles.menuItem}>
        <Text style={SidebarStyles.menuText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Historico')} style={SidebarStyles.menuItem}>
        <Text style={SidebarStyles.menuText}>HISTÓRICO</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapaLojas')} style={SidebarStyles.menuItem}>
        <Text style={SidebarStyles.menuText}>MAPA DE LOJAS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={SidebarStyles.menuItem}>
        <Text style={SidebarStyles.menuText}>CONFIGURAÇÕES</Text>
      </TouchableOpacity>
    </View>
  );
}

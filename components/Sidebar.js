import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SidebarStyles from './styles/SidebarStyles'; // Arquivo de estilo para o sidebar

export default function Sidebar({ navigation }) {
  return (
    <View style={SidebarStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={SidebarStyles.menuItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={SidebarStyles.menuItem}>Settings</Text>
      </TouchableOpacity>

    </View>
  );
}
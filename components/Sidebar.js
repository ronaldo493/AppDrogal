import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SidebarStyles from './styles/SidebarStyles';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles';

export default function Sidebar({ navigation }) {
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const handleLogout = () => {
  
  };

  return (
    <View style={[SidebarStyles.container, themeStyles.sidebar]}>
       <TouchableOpacity onPress={() => navigation.navigate('Home')} style={SidebarStyles.menuItem}>
        <Text style={[SidebarStyles.menuText, themeStyles.text]}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Historico')} style={SidebarStyles.menuItem}>
        <Text style={[SidebarStyles.menuText, themeStyles.text]}>HISTÓRICO</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapaLojas')} style={SidebarStyles.menuItem}>
        <Text style={[SidebarStyles.menuText, themeStyles.text]}>MAPA DE LOJAS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={SidebarStyles.menuItem}>
        <Text style={[SidebarStyles.menuText, themeStyles.text]}>CONFIGURAÇÕES</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={[SidebarStyles.buttonLogoff]}>
        <Text style={[SidebarStyles.logoffText, themeStyles.text]}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

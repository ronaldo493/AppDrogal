import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import { useTheme } from '../context/ThemeContext';
import SidebarStyles from './styles/SidebarStyles';
import useAuth from '../hooks/useAuth';

export default function Sidebar({ navigation }) {
  // Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const { Logout } = useAuth();

  const handleLogout = () => {
    Logout();
  };

  const menuItems = [
    { label: 'ROTAS', route: 'Home' },
    { label: 'HISTÓRICO', route: 'Historico' },
    { label: 'MAPA DE LOJAS', route: 'MapaLojas' },
    { label: 'RESTAURANTES & POSTOS', route: 'AddPoint' },
    { label: 'CHAMADOS', route: 'Chamados' },
    { label: 'PATRIMÔNIO', route: 'Preventiva' },
  ];

  return (
    <View style={[SidebarStyles.container, themeStyles.sidebar]}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route)}
          style={[SidebarStyles.menuItem, themeStyles.borderBottomColor]}
          accessibilityLabel={`Ir para ${item.label}`}
        >
          <Text style={[SidebarStyles.menuText, themeStyles.text]}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={handleLogout}
        style={[SidebarStyles.buttonLogoff, themeStyles.buttonBackgroundSide]}
        accessibilityLabel="Sair do aplicativo"
      >
        <Text style={[SidebarStyles.logoffText, themeStyles.text]}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

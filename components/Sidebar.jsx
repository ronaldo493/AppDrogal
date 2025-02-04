import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import { useTheme } from '../context/ThemeContext';
import SidebarStyles from './styles/SidebarStyles';
import { useAuthContext } from '../context/AuthContext';

export default function Sidebar({ navigation }) {
  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const { clearToken, user } = useAuthContext();

  const handleLogout = () => {
    clearToken();
  };

  const menuItems = [
    { label: 'TRAÇAR ROTA', route: 'Home' },
    { label: 'HISTÓRICO', route: 'Historico' },
    { label: 'CHAMADOS', route: 'Chamados' },
    { label: 'MAPA DE LOJAS', route: 'MapaLojas' },
    { label: 'RESTAURANTES & POSTOS', route: 'AddPoint' },
    ...user?.setor === 'TI - INFRAESTRUTURA' || user?.setor === 'TI - SUPORTE'? [{ label: 'PATRIMÔNIO', route: 'Preventiva' }] : [],
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

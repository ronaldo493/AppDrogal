import React from 'react';
import { View, Text} from 'react-native';
import ChamadosStyles from './styles/ChamadosStyles';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Chamados (){
  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={[ChamadosStyles.container,themeStyles.screenBackground]}>
      <Text style={themeStyles.text}>Em Desenvolvimento</Text>
    </View>
  );
};

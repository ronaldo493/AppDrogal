import React from 'react';
import { View, Text} from 'react-native';
import AboutStyles from '../../screens/styles/AboutStyles';
import { useTheme } from '../../components/ThemeContext';
import { getThemeStyles } from '../../components/styles/ThemeStyles';

export default function About (){
  //Modo Escuro
  const { isDarkMode, toggleTheme } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={[AboutStyles.container, themeStyles.screenBackground]}>
      <Text style={themeStyles.text}>Em Desenvolvimento</Text>
    </View>
  );
};

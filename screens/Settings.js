import React, { useState } from 'react';
import { View, Text, Switch} from 'react-native';
import SettingStyles from './styles/SettingStyles';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Settings() {
  //Modo escuro
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const [language, setLanguage] = useState('pt-BR');

  //Função para mudar o idioma
  const handleLanguageChange = (itemValue) => {
    setLanguage(itemValue);
  };

  return (
    <View style={[SettingStyles.container, themeStyles.screenBackground]}>
      <Text style={[SettingStyles.title, themeStyles.text]}>CONFIGURAÇÕES</Text>
      <View style={[SettingStyles.content, themeStyles.radiusBackground]}>
        <View style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
          <Text style={[SettingStyles.label, themeStyles.text]}>Modo Escuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
          />
        </View>
        
        
      </View>
      
      
      <View style={SettingStyles.footer}>
        <Text style={[SettingStyles.footerText, themeStyles.text]}>Desenvolvido por Ronaldo</Text>
      </View>
    </View>
  );
}

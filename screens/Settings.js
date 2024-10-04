import React, { useState } from 'react';
import { View, Text, Switch} from 'react-native';
import SettingStyles from './styles/SettingStyles';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const [language, setLanguage] = useState('pt-BR');

  //Função para mudar o idioma
  const handleLanguageChange = (itemValue) => {
    setLanguage(itemValue);
  };

  return (
    <View style={[SettingStyles.container, themeStyles.screenBackground]}>
      <Text style={[SettingStyles.title, themeStyles.screenText]}>CONFIGURAÇÕES</Text>
      
      <View style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
        <Text style={[SettingStyles.label, themeStyles.screenText]}>Modo Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
      
      <View style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
        <Text style={[SettingStyles.label, themeStyles.screenText]}>Idioma</Text>
        <Picker
          selectedValue={language}
          style={{ height: 20, width: 160 }}
          onValueChange={handleLanguageChange}
        >
          <Picker.Item label="Português" value="pt-BR" />
          <Picker.Item label="Inglês" value="en" />
        </Picker>
      </View>
      
      <View style={SettingStyles.footer}>
        <Text style={[SettingStyles.footerText, themeStyles.screenText]}>Desenvolvido por Ronaldo</Text>
      </View>
    </View>
  );
}

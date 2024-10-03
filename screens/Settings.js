import React, { useState } from 'react';
import { View, Text, Switch} from 'react-native';
import SettingStyles from './styles/SettingStyles';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme(); 
  const styles = getThemeStyles(isDarkMode);

  const [language, setLanguage] = useState('pt-BR');

  //Função para mudar o idioma
  const handleLanguageChange = (itemValue) => {
    setLanguage(itemValue);
  };

  return (
    <View style={SettingStyles.container}>
      <Text style={SettingStyles.title}>CONFIGURAÇÕES</Text>
      
      <View style={SettingStyles.optionContainer}>
        <Text style={SettingStyles.label}>Modo Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
      
      <View style={SettingStyles.optionContainer}>
        <Text style={SettingStyles.label}>Idioma</Text>
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
        <Text style={SettingStyles.footerText}>Desenvolvido por Ronaldo</Text>
      </View>
    </View>
  );
}

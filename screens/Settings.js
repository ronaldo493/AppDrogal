import React, { useState } from 'react';
import { View, Text, Switch} from 'react-native';
import SettingStyles from './styles/SettingStyles';
import { Picker } from '@react-native-picker/picker';
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
        
        <View style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
          <Text style={[SettingStyles.label, themeStyles.text]}>Idioma</Text>
          <Picker
            selectedValue={language}
            style={{ height: 20, width: 160 }}
            onValueChange={handleLanguageChange}
          >
            <Picker.Item label="Português" value="pt-BR" color={isDarkMode ? '#7D7D7D' : '#000'} />
            <Picker.Item label="Inglês" value="en" color={isDarkMode ? '#7D7D7D' : '#000'} />
          </Picker>
        </View>
      </View>
      
      
      <View style={SettingStyles.footer}>
        <Text style={[SettingStyles.footerText, themeStyles.text]}>Desenvolvido por Ronaldo</Text>
      </View>
    </View>
  );
}

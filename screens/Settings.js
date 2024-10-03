import React, { useState } from 'react';
import { View, Text, Switch} from 'react-native';
import SettingStyles from './styles/SettingStyles';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt-BR');

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  // Função para mudar o idioma
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
          onValueChange={toggleDarkMode}
        />
      </View>
      
      <View style={SettingStyles.optionContainer}>
        <Text style={SettingStyles.label}>Idioma</Text>
        <Picker
          selectedValue={language}
          style={{ height: 10, width: 160 }}
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

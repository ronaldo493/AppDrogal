import React from 'react';
import { View, Text, Switch} from 'react-native';
import SettingStyles from '../styles/SettingStyles';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Settings({navigation}) {
  //Modo escuro
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

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
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Suporte')} style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
            <Text style={[SettingStyles.label, themeStyles.text]}>Suporte</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('About')} style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
            <Text style={[SettingStyles.label, themeStyles.text]}>Sobre</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      
      <View style={SettingStyles.footer}>
        <Text style={[SettingStyles.footerText, themeStyles.text]}>Desenvolvido por Ronaldo</Text>
      </View>
    </View>
  );
}

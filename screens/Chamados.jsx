import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import { useTheme } from '../context/ThemeContext';
import ChamadosStyles from './styles/ChamadosStyles';

export default function Chamados (){
  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const [selectedOption, setSelectedOption] = useState('');

  return (
    <View style={[ChamadosStyles.container,themeStyles.screenBackground]}>
      <View style={ChamadosStyles.btnContainer}>
        <TouchableOpacity 
        style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'atribuido' && themeStyles.buttonSelected]} 
        onPress={() => setSelectedOption('atribuido')}>
          <Text style={[ChamadosStyles.textTitle, themeStyles.text]}>ATRIBUÍDOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'naoAtribuido' && themeStyles.buttonSelected]}
        onPress={() => setSelectedOption('naoAtribuido')}>
          <Text style={[ChamadosStyles.textTitle, themeStyles.text]}>NÃO ATRIBUÍDOS</Text>
        </TouchableOpacity>
      </View>
      {selectedOption === 'atribuido' && (
        <View style={ChamadosStyles.content}>
          <Text style={[ChamadosStyles.textContent, themeStyles.text]}>Conteúdo dos chamados atribuídos em Desenvolvimento.</Text>
        </View>
      )}
      {selectedOption === 'naoAtribuido' && (
        <View style={ChamadosStyles.content}>
          <Text style={[ChamadosStyles.textContent, themeStyles.text]}>Conteúdo dos chamados não atribuídos em Desenvolvimento.</Text>
        </View>
      )}
    </View>
  );
};

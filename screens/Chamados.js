import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import ChamadosStyles from './styles/ChamadosStyles';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles';

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
          <Text style={[ChamadosStyles.text, themeStyles.text]}>ATRIBUÍDOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ChamadosStyles.button, themeStyles.radiusBackground, selectedOption === 'naoAtribuido' && themeStyles.buttonSelected]}
        onPress={() => setSelectedOption('naoAtribuido')}>
          <Text style={[ChamadosStyles.text, themeStyles.text]}>NÃO ATRIBUÍDOS</Text>
        </TouchableOpacity>
      </View>
      {selectedOption === 'atribuido' && (
        <View style={ChamadosStyles.content}>
          <Text style={[themeStyles.text]}>Conteúdo dos chamados atribuídos.</Text>
        </View>
      )}
      {selectedOption === 'naoAtribuido' && (
        <View style={ChamadosStyles.content}>
          <Text style={themeStyles.text }>Conteúdo dos chamados não atribuídos.</Text>
        </View>
      )}
    </View>
  );
};

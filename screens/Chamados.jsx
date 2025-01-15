import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import { useTheme } from '../context/ThemeContext';
import  useChamados  from '../hooks/useChamados'
import ChamadosStyles from './styles/ChamadosStyles';

export default function Chamados (){
  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);
  
  const { chamados} = useChamados();

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
        {chamados
          .filter((chamado) => chamado.situacao === 1)
          .map((chamado, index) => (
            <View key={index} style={[themeStyles.sidebar, ChamadosStyles.item]}>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]} >
                {chamado.dataabertura}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {chamado.nomefilial}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {chamado.descricao}
              </Text>
            </View>
            
          ))}
      </View>
      )}
      {selectedOption === 'naoAtribuido' && (
        <View style={ChamadosStyles.content}>
          {chamados
          .filter((chamado) => chamado.situacao !== 1)
          .map((chamado, index) => (
            <View key={index} style={[themeStyles.sidebar, ChamadosStyles.item]}>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]} >
                {chamado.dataabertura}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {chamado.nomefilial}
              </Text>
              <Text style={[ChamadosStyles.textContent, themeStyles.text]}>
                {chamado.descricao}
              </Text>
            </View>
            
          ))}
        </View>
      )}
    </View>
  );
};

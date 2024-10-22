import React, { useState }from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import PreventivaStyles from '../styles/PreventivaStyles';
import Checklist from './Checklist';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 

export default function Preventiva (){
    //Modo escuro
    const { isDarkMode } = useTheme(); 
    const themeStyles = getThemeStyles(isDarkMode);

    //Filial Escolhida
    const [filialInput, setFilialInput] =useState('');
    const [showChecklist, setShowChecklist] = useState(false);
    
    //Função de Start da Preventiva
    const handleStartPreventiva = () => {
      if (!filialInput) {
        Alert.alert('Atenção!', 'Por favor, insira a Filial')
        return;
      }   
    }

    const toggleChecklist = () => {
      setShowChecklist((prev) => !prev); //alterna a visualização do checklist
    };


  return (
    <View style={[PreventivaStyles.container,themeStyles.screenBackground]}>
      <Text style={[PreventivaStyles.title, themeStyles.text]}>PREVENTIVA</Text>
      <Text style={[PreventivaStyles.label, themeStyles.text]}>INICIE AS ANOTAÇÕES:</Text>
      <View style={PreventivaStyles.inputContainer}>
        <TextInput
          value={filialInput}
          onChangeText={setFilialInput}
          placeholder='Digite a Filial'
          placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
          keyboardType="numeric"
          style={[PreventivaStyles.input, themeStyles.input]}
        />
        <TouchableOpacity onPress={handleStartPreventiva}>
          <Text style={[PreventivaStyles.button, themeStyles.textBackground]}>
            COMEÇAR
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botão Visualizar Checklist */}
      <View style={PreventivaStyles.buttonCheckContainer}>
        <TouchableOpacity onPress={toggleChecklist}>
          <Text style={[PreventivaStyles.buttonChecklist, themeStyles.text]}>
            {showChecklist ? 'Esconder Checklist \u25BC' : 'Visualizar Checklist \u25BC'}
          </Text>
        
        </TouchableOpacity>

        {/* Renderiza o checklist se showChecklist for true */}
        {showChecklist && <Checklist />}
      </View>
        
    </View>
  );
};

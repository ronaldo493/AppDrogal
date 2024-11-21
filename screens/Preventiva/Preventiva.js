import React, { useState }from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Modal} from 'react-native';
import PreventivaStyles from '../styles/PreventivaStyles';
import Checklist from './Checklist';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles';
import { useNavigation } from '@react-navigation/native';

export default function Preventiva (){
    //Modo escuro
    const { isDarkMode } = useTheme(); 
    const themeStyles = getThemeStyles(isDarkMode);

    //Filial Escolhida
    const [filialInput, setFilialInput] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); //Estado para a opção selecionada
    const [showModal, setShowModal] = useState(false); //Estado para controlar a exibição das opções
    const [showChecklist, setShowChecklist] = useState(false); //Para mostrar ou esconder o checklist

    //Navegação
    const navigation = useNavigation();
    
    //Função de Start da Preventiva
    const handleStartPreventiva = () => {
      if (!filialInput || !selectedOption) {
          Alert.alert('Atenção!', 'Por favor, insira a Filial e selecione uma opção');
          return;
      }
      //Navegação com filial e a opção selecionada
      navigation.navigate('PatrimonioAssinatura', { filial: filialInput, option: selectedOption });
    };

    const toggleChecklist = () => {
      setShowChecklist((prev) => !prev); //alterna a visualização do checklist
    };

    //Função para selecionar a opção
    const handleOptionSelect = (option) => {
        setSelectedOption(option); //Atualiza a opção selecionada
        setShowModal(false); //Esconde as opções após selecionar
        handleStartPreventiva(); //Chama a função de início da preventiva
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
        <TouchableOpacity onPress={() => setShowModal(true)}>
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

      {/* Modal para seleção da opção */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
        style
      >
        <View style={PreventivaStyles.modalContainer}>
          <View style={[PreventivaStyles.modalContent, themeStyles.contentModal]}>
              <Text style={[PreventivaStyles.modalTitle, themeStyles.titleModal]}>Escolha uma opção:</Text>
              {['PREVENTIVA', 'MONTAGEM', 'INCLUSÃO', 'TROCA'].map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => handleOptionSelect(option)} 
                  style={[PreventivaStyles.optionButton, themeStyles.button]}
                >
                  <Text style={[PreventivaStyles.optionText, themeStyles.textModal]}>
                      {option}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                 style={[PreventivaStyles.closeButton, themeStyles.buttonModal]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[PreventivaStyles.closeButtonText, themeStyles.text]}>Fechar</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>   
    </View>
  );
};

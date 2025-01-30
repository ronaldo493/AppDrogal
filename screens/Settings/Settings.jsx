import React, { useState } from 'react';
import { Switch, Text, View, Modal } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getThemeStyles } from '../../components/styles/ThemeStyles';
import { useTheme } from '../../context/ThemeContext';
import SettingStyles from '../styles/SettingStyles';
import useSugestao from '../../hooks/useSugestao';

export default function Settings({navigation}) {
  //Modo escuro
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const { postSugestao, loading, error } = useSugestao();

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ sugestao, setSugestao] = useState("");

  const handleEnviar = async () => {
    const sucesso = await postSugestao(email, sugestao)
    if (sucesso) {
      setEmail('');
      setSugestao('');
      setModalVisible(false);
    }
  }

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
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}  style={[SettingStyles.optionContainer, themeStyles.borderBottomColor]}>
            <Text style={[SettingStyles.label, themeStyles.text]}>Sugestão</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Sugestao */}
      <Modal visible={modalVisible} >
        <View style={SettingStyles.modalContainer}>
          <Text style={SettingStyles.modalTitle}>SUGESTÃO DE MELHORIA</Text>
          <View style={SettingStyles.modalInput}>
            <TextInput
              style={SettingStyles.modalInputText}
              placeholder='Digite seu E-mail'
              onChangeText={setEmail}
              keyboardType='default'
            />
            <TextInput
              style={[SettingStyles.modalInputText, {height: 200}]}
              placeholder='Descreva sua Sugestão...'
              onChangeText={setSugestao}
              multiline
            />
          </View>
          <View style={SettingStyles.btnContainer}>
            <View style={SettingStyles.btnView}>
              <TouchableOpacity onPress={handleEnviar} style={SettingStyles.modalButton}>
                <Text style={[SettingStyles.textButton, themeStyles.text]}>{loading ? "Enviando..." : "ENVIAR"}</Text>
              </TouchableOpacity>
            </View>
            <View style={SettingStyles.btnView}> 
              <TouchableOpacity onPress={() => {setModalVisible(false)}} style={[SettingStyles.modalButton, themeStyles.buttonModal]}>
                <Text style={[SettingStyles.textButton, themeStyles.text]}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

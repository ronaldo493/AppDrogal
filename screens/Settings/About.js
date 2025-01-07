import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AboutStyles from '../../screens/styles/AboutStyles';
import { useTheme } from '../../components/ThemeContext';
import { getThemeStyles } from '../../components/styles/ThemeStyles';

export default function About({navigation}) {
  //Modo Escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={[AboutStyles.container, themeStyles.screenBackground]}>
      <Text style={[AboutStyles.title, themeStyles.text]}>SOBRE O APLICATIVO</Text>

      <Text style={[AboutStyles.text, themeStyles.text]}>
        Este aplicativo foi desenvolvido para facilitar o trabalho dos colaboradores que realizam
        atividades externas, ajudando na localização de filiais e na visualização de chamados.
        Com ele, você pode traçar rotas para as filiais mais próximas utilizando o Google Maps ou Waze.
        Além disso, o aplicativo permite a consulta de chamados, tanto os atribuídos quanto os não atribuídos,
        proporcionando uma visão clara das tarefas a serem realizadas.
      </Text>

      <Text style={[AboutStyles.highlightText, themeStyles.textImp]}>
        IMPORTANTE: o aplicativo não permite modificações nos chamados, apenas visualização.
      </Text>

      <Text style={[AboutStyles.versionText, themeStyles.text]}>
        Versão do Aplicativo: 1.0.4
      </Text>

      <Text style={[AboutStyles.developerText, themeStyles.text]}>
        Desenvolvido por: Ronaldo
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={themeStyles.buttonBack}>
          <Text style={themeStyles.text}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

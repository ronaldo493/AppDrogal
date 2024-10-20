import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import SuporteStyles from '../styles/SuporteStyles';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 

export default function Suporte ({navigation}){
    //Modo escuro
    const { isDarkMode } = useTheme(); 
    const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={[SuporteStyles.container,themeStyles.screenBackground]}>
      <Text style={[SuporteStyles.title, themeStyles.text]}>Suporte</Text>
      <Text style={[SuporteStyles.tipTextObs, themeStyles.textImp]}>
        OBS: Para o perfeito funcionamento do aplicativo é preciso estar ativado a localização do celular.
             O Sistema de traçar rota, por padrão o waze não consegue gerar várias rotas ao mesmo tempo.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        1° Trace rotas para várias filiais ao mesmo tempo.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        2° Use a aba de chamados para consultar rapidamente quais tarefas estão atribuídas ou pendentes.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        3° Na opção 'Mapa Lojas', você verá as lojas conforme a sua localização. Poderá filtrar as lojas por cidade e traçar rotas para chegar até elas usando Google Maps.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        4° Ative o modo escuro nas configurações para facilitar a visualização em ambientes com pouca luz.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        6° Mesmo sem internet, você ainda pode visualizar chamados e suas atribuições anteriores.
      </Text>
      <Text style={[SuporteStyles.tipText, themeStyles.text, { fontStyle: 'italic', marginTop: 20 }]}>
        🚧 Algumas funcionalidades estão em desenvolvimento. Fique atento a atualizações!
      </Text>
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={themeStyles.buttonBack}>
          <Text style={themeStyles.text}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

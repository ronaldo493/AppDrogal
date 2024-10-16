import React from 'react';
import { View, Text} from 'react-native';
import SuporteStyles from '../styles/SuporteStyles';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 

export default function Suporte (){
    //Modo escuro
    const { isDarkMode } = useTheme(); 
    const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={[SuporteStyles.container,themeStyles.screenBackground]}>
      <Text style={[SuporteStyles.title, themeStyles.text]}>Suporte</Text>
      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        1. Para o perfeito funcionamento do aplicativo é preciso estr ativado a localização do celular.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        2. Use a aba de chamados para consultar rapidamente quais tarefas estão atribuídas ou pendentes.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        3. Na opção 'Mapa Lojas', você pode localizar lojas em uma cidade específica e traçar rotas para chegar até elas usando Google Maps.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        4. Ative o modo escuro nas configurações para facilitar a visualização em ambientes com pouca luz.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        5. Utilize o botão de localização rápida para encontrar a filial mais próxima no mapa.
      </Text>

      <Text style={[SuporteStyles.tipText, themeStyles.text]}>
        6. Mesmo sem internet, você ainda pode visualizar chamados e suas atribuições anteriores.
      </Text>
    </View>
  );
};

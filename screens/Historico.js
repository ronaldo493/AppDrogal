import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import HistoricoStyles from './styles/HistoricoStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Historico() {
  //Modo escuro
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  const [routeHistory, setRouteHistory] = useState([]);

  //Carregar o histórico sempre que a tela for focada
  useFocusEffect(
    React.useCallback(() => {
      const loadRouteHistory = async () => {
        try {
          const history = await AsyncStorage.getItem('routeHistory');
          if (history) {
            setRouteHistory(JSON.parse(history));
          }
        } catch (error) {
          console.log('Erro ao carregar o histórico de rotas:', error);
        }
      };
      loadRouteHistory();
    }, [])
  );

  //Limpar o histórico
  const clearHistory = async () => {
    if (routeHistory.length === 0) {
      Alert.alert('Atenção!', 'Histórico Vazio.');
      return;
    }
    
    Alert.alert(
      'Atenção!',
      'Você tem certeza que deseja limpar o histórico?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('routeHistory');
              setRouteHistory([]);
            } catch (error) {
              Alert.alert('Erro ao limpar o histórico:', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[HistoricoStyles.container, themeStyles.screenBackground]}>
      <Text style={[HistoricoStyles.title, themeStyles.text]}>HISTÓRICO DE ROTAS</Text>
      <FlatList
        data={routeHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[HistoricoStyles.routeItem, themeStyles.radiusBackground]}>
            <Text style={[themeStyles.text]}>Data: {item.date}</Text>
            <Text style={[themeStyles.text]}>Rota:</Text>
            {Array.isArray(item.routes) && item.routes.length > 0 ? ( //Verifica se 'routes' é um array
              item.routes.map((route, index) => (
                <Text key={index} style={[themeStyles. text]}>
                  Filial: {route.codigofilial || 'Desconhecida'}, Cidade: {route.nomecidade || 'Desconhecida'}
                </Text>
              ))
            ) : (
              <Text>Nenhuma rota disponível</Text>
            )}
          </View>
        )}
      />
      <TouchableOpacity
        onPress={clearHistory}
      >
      <Text style={[themeStyles.textBackground, themeStyles.buttonBackgroundScreen]}> 
        LIMPAR HISTÓRICO
      </Text>
    </TouchableOpacity>
      
    </View>
  );
}

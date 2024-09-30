import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import HistoricoStyles from './styles/HistoricoStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Historico() {
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
    <View style={HistoricoStyles.container}>
      <Text style={HistoricoStyles.title}>HISTÓRICO DE ROTAS</Text>
      <FlatList
        data={routeHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={HistoricoStyles.routeItem}>
            <Text>Data: {item.date}</Text>
            <Text>Rota:</Text>
            {Array.isArray(item.routes) && item.routes.length > 0 ? ( //Verifica se 'routes' é um array
              item.routes.map((route, index) => (
                <Text key={index}>
                  Filial: {route.codigofilial || 'Desconhecida'}, Cidade: {route.nomecidade || 'Desconhecida'}
                </Text>
              ))
            ) : (
              <Text>Nenhuma rota disponível</Text>
            )}
          </View>
        )}
      />
      <Button title="Limpar Histórico" onPress={clearHistory} color="#cc0000" />
    </View>
  );
}

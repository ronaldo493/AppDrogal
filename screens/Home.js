import React, { useState, useEffect } from 'react';
import { View, Alert, Image, TouchableOpacity, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import RouteList from '../components/RouteList';
import HomeStyles from './styles/HomeStyles';
import MapService from '../services/MapService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Home() {
  const [routes, setRoutes] = useState([]); //Estado que armazena as rotas/filiais selecionadas pelo usuário

  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  //Função para adicionar uma filial
  const handleAddRoute = (filial) => {
    if (routes.some(route => route.codigofilial === filial.codigofilial)){
      Alert.alert('Atenção!', 'Filial já adicionada.');
      return;
    }
    setRoutes([...routes, filial]);
  };

  //Função para remover uma rota/filial
  const handleRemoveRoute = (filialToRemove) => {
    setRoutes(routes.filter(filial => filial.codigofilial !== filialToRemove.codigofilial));
  };

  //Função para reordenar rotas
  const handleReorderRoutes = (updatedRoutes) => {
    setRoutes(updatedRoutes);
  };

  //Função para traçar a rota
  const handleTraceRoute = async () => {

    if (routes.length === 0) {
      Alert.alert('Atenção!', 'Nenhuma filial selecionada');
      return;
    }
    
    const currentDate = new Date().toLocaleString(); //Obtém a data atual

    try {
      //Tenta pegar o histórico de rotas que já está salvo
      const history = await AsyncStorage.getItem('routeHistory');

      //Se tiver alguma coisa no histórico, transforma em objeto; se não, cria um array vazio
      const parsedHistory = history ? JSON.parse(history) : [];
  
      //Transforma a rota com informações do Código e cidade
      const updatedRoute = {
        date: currentDate,
        routes: routes.map(route => ({
          codigofilial: route.codigofilial,
          nomecidade: route.nomecidade,
        })),  
      };

      parsedHistory.push(updatedRoute);
      await AsyncStorage.setItem('routeHistory', JSON.stringify(parsedHistory));

      Alert.alert(
        'Escolha o Navegador',
        'Deseja abrir a rota no Google Maps ou no Waze?',
        [
          { text: 'Google Maps', onPress: () => MapService.openGoogleMapsRoute(routes) },
          { text: 'Waze', onPress: () => MapService.openWazeRoute(routes) },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } catch (error) {
      Alert.alert('Erro ao salvar o histórico', error.message);
    }
  };

  return (
    <View style={[HomeStyles.container, themeStyles.screenBackground]}>
      <View style={HomeStyles.logoContainer}>
        <Image source={require('../assets/img/drogal.png')} style={[HomeStyles.logo, themeStyles.logoImg]} />
      </View>
      <SearchBar onAddRoute={handleAddRoute} />
      <View style={HomeStyles.routeContainer}>
        <View style={{ flex: 1 }}> 
          <RouteList 
            routes={routes} 
            onRemoveRoute={handleRemoveRoute} 
            onReorderRoutes={handleReorderRoutes} 
          />
        </View>

        <TouchableOpacity onPress={handleTraceRoute}>
          <Text style={[themeStyles.textBackground, themeStyles.buttonBackgroundScreen]}>
            TRAÇAR ROTA
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

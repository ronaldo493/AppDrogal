import React, { useState, useEffect } from 'react';
import { View, Alert, Image, TouchableOpacity, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import RouteList from '../components/RouteList';
import HomeStyles from './styles/HomeStyles';
import * as Location from 'expo-location';
import MapService from '../services/MapService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

export default function Home() {
  const [routes, setRoutes] = useState([]); //Estado que armazena as rotas/filiais selecionadas pelo usuário
  const [currentLocation, setCurrentLocation] = useState(null); //Estado que armazena a localização atual do usuário
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); //Estado para verificar se a localização foi carregada

  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //Solicita permissão para acessar a localização
      
      //Verificação de Permissão
      if (status !== 'granted') { 
        Alert.alert('Permissão Negada', 'Você precisa permitir o acesso à localização para traçar a rota.', [
          { text: 'Solicitar Permissão', onPress: () => getLocation() }, //Reexecuta getLocation
          { text: 'Sair', onPress: () => console.log('Usuário saiu') }
        ]);
        return false;
      }

      try {
        //Obtém a localização atual do usuário
        let location = await Location.getCurrentPositionAsync();
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setIsLocationLoaded(true); //Define que a localização foi carregada
      } catch (error) {
        Alert.alert('Erro ao obter localização!');
      }
    };
    getLocation();
  }, []);

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

    //Função para traçar a rota
  const handleTraceRoute = async () => {
    if (!isLocationLoaded) {
      Alert.alert('Atenção', 'Localização ainda está sendo carregada. Tente novamente em alguns segundos.');
      return;
    }

    if (routes.length === 0) {
      Alert.alert('Atenção!', 'Nenhuma filial selecionada');
      return;
    }

    //Adiciona a localização atual como a primeira posição na rota
    const completeRoute = [
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude }, 
      ...routes
    ];
    
    const currentDate = new Date().toLocaleString(); //Obtém a data atual

    try {
      //Tenta pegar o histórico de rotas que já está salvo
      const history = await AsyncStorage.getItem('routeHistory');

      //Se tiver alguma coisa no histórico, transforma em objeto; se não, cria um array vazio
      const parsedHistory = history ? JSON.parse(history) : [];
  
      //Transforma a rota com informações do Codigo e cidade
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
          { text: 'Google Maps', onPress: () => MapService.openGoogleMapsRoute(completeRoute) },
          { text: 'Waze', onPress: () => MapService.openWazeRoute(completeRoute) },
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
        <RouteList routes={routes} onRemoveRoute={handleRemoveRoute} />
        <TouchableOpacity
        onPress={handleTraceRoute}
      >
      <Text style={[themeStyles.textBackground, themeStyles.buttonBackgroundScreen]}>
        TRAÇAR ROTA
      </Text>
    </TouchableOpacity>
      </View>
    </View>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import RouteList from '../components/RouteList';
import SearchBar from '../components/SearchBar';
import { useTheme } from '../components/ThemeContext';
import { getThemeStyles } from '../components/styles/ThemeStyles';
import MapService from '../services/MapService';
import HomeStyles from './styles/HomeStyles';

export default function Home() {
  const [routes, setRoutes] = useState([]); //Estado que armazena as rotas/filiais selecionadas pelo usuário
  const [currentLocation, setCurrentLocation] = useState(null); //Estado que armazena a localização atual do usuário
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); //Estado para verificar se a localização foi carregada

  //Modo escuro
  const { isDarkMode } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  useEffect(() => {
    const subscribeToLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //Solicita permissão para acessar a localização
      
      //Verificação de Permissão
      if (status !== 'granted') { 
        Alert.alert('Permissão Negada', 'Você precisa permitir o acesso à localização para traçar a rota.', [
          { text: 'Solicitar Permissão', onPress: () => subscribeToLocationUpdates() }, //Reexecuta a função
          { text: 'Sair', onPress: () => console.log('Usuário saiu') }
        ]);
        return;
      }

      //Define o watcher para a localização
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, //Tempo em milissegundos entre atualizações
          distanceInterval: 1, //Distância em metros entre atualizações
        },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setIsLocationLoaded(true); //Define que a localização foi carregada
        }
      );

      return () => {
        //Limpa o watcher ao desmontar o componente
        locationSubscription.remove();
      };
    };

    subscribeToLocationUpdates();
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

  //Função para reordenar rotas
  const handleReorderRoutes = (updatedRoutes) => {
    setRoutes(updatedRoutes);
  };

  //Função para traçar a rota
  const handleTraceRoute = async () => {
    // console.log('Estado atual da localização:', currentLocation)
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
          { text: 'Google Maps', onPress: () => MapService.openGoogleMapsRoute(completeRoute) },
          { text: 'Waze', onPress: () => MapService.openWazeRoute(completeRoute) },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } catch (error) {
      Alert.alert('Erro ao salvar o histórico', error.message);
    }
  };
  console.log('123')
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

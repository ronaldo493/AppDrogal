import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import RouteList from '../components/RouteList';
import HomeStyles from '../components/styles/HomeStyles';
import * as Location from 'expo-location';
import MapService from '../services/MapService';

export default function Home() {
  const [routes, setRoutes] = useState([]); //Estado que armazena as rotas/filiais selecionadas pelo usuário
  const [currentLocation, setCurrentLocation] = useState(null); //Estado que armazena a localização atual do usuário

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //Solicita permissão para acessar a localização do dispositivo
      if (status !== 'granted') {
        Alert.alert('Erro', 'Permissão para acessar localização foi negada.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  const handleAddRoute = (filial) => {
    // Verifica se a filial já foi adicionada
    if (routes.some(route => route.codigofilial === filial.codigofilial)){
      Alert.alert('Atenção!', 'Filial já adicionada.');
      return;
    }
    setRoutes([...routes, filial]);
  };

  const handleRemoveRoute = (filialToRemove) => {
    setRoutes(routes.filter(filial => filial.codigofilial !== filialToRemove.codigofilial));
  };

  const handleTraceRoute = () => {
    if (!currentLocation) {
      Alert.alert('Erro', 'Localização atual não encontrada.');
      return;
    }

    if (routes.length === 0) {
      Alert.alert('Nenhuma filial selecionada', 'Adicione uma Filial para traçar uma rota.');
      return;
    }

    // Adiciona a localização atual como a primeira posição na rota
    const completeRoute = [{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }, ...routes];

    // Chama o MapService para abrir o Google Maps
    MapService.openGoogleMapsRoute(completeRoute);
  };

  return (
    <View style={HomeStyles.container}>
      <View style={HomeStyles.logoContainer}>
        <Image source={require('../assets/img/drogal.png')} style={HomeStyles.logo} />
      </View>
      <SearchBar onAddRoute={handleAddRoute} />
      <View style={HomeStyles.routeContainer}>
        <RouteList routes={routes} onRemoveRoute={handleRemoveRoute} />
        <Button title="Traçar Rota" onPress={handleTraceRoute} />
      </View>
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../../components/ThemeContext';
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 
import MapaStyles, { darkMapStyle } from '../styles/MapaLojasStyles';

export default function RestaurantesPostos() {
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const [mapRegion, setMapRegion] = useState({
    latitude: -22.7277,
    longitude: -47.6490,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState([]);

  // Pega localização atual do usuário
  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Habilite a permissão para usar o recurso.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    };

    fetchLocation();
  }, []);

  // Função para salvar ponto
  const savePoint = () => {
    if (!selectedPoint || !description.trim()) {
      Alert.alert('Erro', 'Selecione um local e insira uma descrição.');
      return;
    }

    const newPoint = {
      ...selectedPoint,
      description,
    };
    setPoints([...points, newPoint]);
    Alert.alert('Sucesso', 'Ponto adicionado!');
    setSelectedPoint(null);
    setDescription('');
  };

  return (
    <View style={[MapaStyles.container, themeStyles.screenBackground]}>
      {/* Mapa com pontos */}
      <MapView
        style={MapaStyles.map}
        region={mapRegion}
        customMapStyle={isDarkMode ? darkMapStyle : []}
        onPress={(e) => setSelectedPoint(e.nativeEvent.coordinate)} // Marca o ponto selecionado
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Minha Localização"
            pinColor="blue"
          />
        )}

        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.description}
            pinColor="green"
          />
        ))}

        {selectedPoint && (
          <Marker
            coordinate={selectedPoint}
            title="Novo Ponto"
            pinColor="red"
          />
        )}
      </MapView>

      {/* Campos para adicionar ponto */}
      <View style={MapaStyles.addPointContainer}>
        <TextInput
          style={[MapaStyles.input, themeStyles.input]}
          placeholder="Descrição do Ponto"
          placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
          value={description}
          onChangeText={setDescription}
        />

        <View style={MapaStyles.buttonGroup}>
          <TouchableOpacity
            style={MapaStyles.button}
            onPress={() => {
              if (currentLocation) {
                setSelectedPoint(currentLocation);
              } else {
                Alert.alert('Erro', 'Localização atual não disponível.');
              }
            }}
          >
            <Text style={MapaStyles.buttonText}>Usar Localização Atual</Text>
          </TouchableOpacity>

          <TouchableOpacity style={MapaStyles.button} onPress={savePoint}>
            <Text style={MapaStyles.buttonText}>Salvar Ponto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import filiaisData from '../data/filiais.json';
import MapaLojasStyles, { darkMapStyle } from './styles/MapaLojasStyles';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 

const MapaLojas = () => {
  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  //Coordenadas de Piracicaba onde o mapa irá iniciar
  const piracicabaCoordinates = {
    latitude: -22.7277,
    longitude: -47.6490,
  };

  //Estado para armazenar a cidade digitada, a região do mapa e a localização atual
  const [searchCity, setSearchCity] = useState('');
  const [filteredFiliais, setFilteredFiliais] = useState(filiaisData);
  const [mapRegion, setMapRegion] = useState({
    ...piracicabaCoordinates,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  //Função para remover acentos e normalizar o texto
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD') //Decompõe caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') //Remove os acentos
      .trim(); //Remove espaços em branco nas pontas
  };

  //Obtém a localização atual do usuário
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
        Alert.alert('Permissão de localização negada');
       return;
}

        //Obtém a posição atual do usuário
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 3000, 
          maximumAge: 1000, //Use a localização armazenada se disponível
        });
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
      } catch (error) {
        Alert.alert('Erro ao obter localização!');
        
      }
    };

    getLocation();
  }, []);

  //Atualiza a região do mapa e os marcadores quando o usuário digitar uma cidade
  useEffect(() => {
    if (searchCity.trim() !== '') {
      const filiaisFiltradas = filiaisData.filter(filial =>
        normalizeText(filial.nomecidade).includes(normalizeText(searchCity))
      );

      if (filiaisFiltradas.length > 0) {
        const firstFilial = filiaisFiltradas[0];
        const latitude = parseFloat(firstFilial.latitude?.replace(',', '.'));
        const longitude = parseFloat(firstFilial.longitude?.replace(',', '.'));

        if (latitude && longitude) {
          setMapRegion({
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }

        //Atualiza os marcadores filtrados
        setFilteredFiliais(filiaisFiltradas);
      }
    } else {
      //Se a busca estiver vazia, exibe todas as filiais
      setFilteredFiliais(filiaisData);
    }
  }, [searchCity]);

  return (
    <View style={[MapaLojasStyles.container, themeStyles.screenBackground]}>
      <TextInput
        style={[MapaLojasStyles.input, themeStyles.input]}
        placeholder="DIGITE A CIDADE"
        placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
        value={searchCity}
        onChangeText={setSearchCity}
      />
      
      <MapView
        style={MapaLojasStyles.map}
        region={mapRegion}
        customMapStyle={isDarkMode ? darkMapStyle : []}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Localização Atual"
            pinColor="blue"
          />
        )}

        {filteredFiliais.map(filial => {
          const latitude = parseFloat(filial.latitude?.replace(',', '.'));
          const longitude = parseFloat(filial.longitude?.replace(',', '.'));

          if (!isNaN(latitude) && !isNaN(longitude)) {
            return (
              <Marker
                key={filial.codigofilial}
                coordinate={{ latitude, longitude }}
                title={filial.nomefilial}
                description={`Endereço: ${filial.endereco}, ${filial.numero}, ${filial.bairro}, ${filial.nomecidade}`}
              />
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
};

export default MapaLojas;

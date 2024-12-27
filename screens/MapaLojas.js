import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapaLojasStyles from './styles/MapaLojasStyles';
import { useTheme } from '../components/ThemeContext'; 
import { getThemeStyles } from '../components/styles/ThemeStyles'; 
import { useFiliais } from '../components/FiliaisContext';
import debounce from 'lodash.debounce';

export default function MapaLojas(){
  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  //Lista de filiais do contexto
  const { filiais } = useFiliais();

  //Coordenadas de Piracicaba onde o mapa irá iniciar
  const piracicabaCoordinates = {
    latitude: -22.7277,
    longitude: -47.6490,
  };

  //Estado para armazenar a cidade digitada, a região do mapa e a localização atual
  const [searchCity, setSearchCity] = useState('');
  const [filteredFiliais, setFilteredFiliais] = useState([]);
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

  //Atualiza os marcadores e a região do mapa ao carregar as filiais
  useEffect(() => {
    if (filiais.length > 0) {
      setFilteredFiliais(filiais);

      const primeiraFilial = filiais.find((filial) => {
        const latitude = parseFloat(filial.latitude?.replace(',', '.'));
        const longitude = parseFloat(filial.longitude?.replace(',', '.'));
        return !isNaN(latitude) && !isNaN(longitude);
      });

      if (primeiraFilial) {
        const latitude = parseFloat(primeiraFilial.latitude?.replace(',', '.'));
        const longitude = parseFloat(primeiraFilial.longitude?.replace(',', '.'));
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    }
  }, [filiais]);

  //Função para atualizar a busca com debounce
  const searchCityDebounced = useCallback(
    debounce((city) => {
      const filiaisFiltradas = filiais.filter((filial) =>
        normalizeText(filial.nomecidade).includes(normalizeText(city))
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
      }

      setFilteredFiliais(filiaisFiltradas);
    }, 300),
    [filiais]
  );

  //Limpa o debounce ao desmontar o componente
  useEffect(() => {
    return () => {
      searchCityDebounced.cancel();
    };
  }, [searchCityDebounced]);

  //Atualiza a cidade digitada
  const searchCityChange = (text) => {
    setSearchCity(text);
    searchCityDebounced(text);
  };

  return (
    <View style={[MapaLojasStyles.container, themeStyles.screenBackground]}>
      <TextInput
        style={[MapaLojasStyles.input, themeStyles.input]}
        placeholder="DIGITE A CIDADE"
        placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
        value={searchCity}
        onChangeText={searchCityChange}
      />
      
      <MapView
        key={isDarkMode ? 'dark' : 'light'}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation={true} //Exibe o ícone de localização do usuário
        zoomEnabled={true} //Permite zoom
        //followUserLocation={true} //Faz o mapa seguir o usuário
        zoomControlEnabled={true} //Exibe controles de zoom no mapa
        style={MapaLojasStyles.map}
        region={mapRegion}
        customMapStyle={themeStyles.mapStyle}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Localização Atual"
            pinColor="blue"
          />
        )}

        {filteredFiliais.map(filial => {
          //Converte as coordenadas para números
          const latitude = parseFloat(filial.latitude);
          const longitude = parseFloat(filial.longitude);

          //Log para verificar o tipo de dado
          //console.log(`Filial: ${filial.codigofilial}, latitude: ${typeof latitude}, longitude: ${typeof longitude}`);

          //Verifica se ambos são números válidos
          if (!isNaN(latitude) && !isNaN(longitude)) {
            return (
              <Marker
                key={filial.codigofilial}
                coordinate={{ latitude, longitude }}
                title={filial.nomefilial}
                description={`Endereço: ${filial.endereco}, ${filial.numero}, ${filial.bairro}, ${filial.nomecidade}`}
              />
            );
          } else {
            //console.log(`Filial com erro: ${filial.codigofilial}, latitude: ${latitude}, longitude: ${longitude}`);
          }
          return null;
        })}
      </MapView>
    </View>
  );
};

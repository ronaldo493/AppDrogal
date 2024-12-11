import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 
import  AddPointStyles from '../styles/AddPointStyles';
import StrapiClient from '../../services/StrapiClient';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddPoint() {
  //Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  //Estado para gerenciar a região exibida no mapa
  const [mapRegion, setMapRegion] = useState({
    latitude: -22.7277,
    longitude: -47.6490,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });


  const [currentLocation, setCurrentLocation] = useState(null); //Estado para armazenar a localização atual do usuário
  const [selectedPoint, setSelectedPoint] = useState(null); //Estado para armazenar o ponto selecionado pelo usuário
  const [description, setDescription] = useState(''); //Estado para armazenar a descrição do ponto
  const [points, setPoints] = useState([]); //Estado para armazenar os pontos salvos (restaurantes ou postos)
  const [isPontoAdd, setIsPontoAdd] = useState(false); //Estado para controlar se o usuário está no modo de adição de ponto

  //Obter a localização do usuário ao entrar na tela
  useEffect(() => {
    const getLocation = async () => {
      try {
        //Solicita permissão para acessar a localização
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert('Permissão de localização negada');
          return;
        }

        //Obtém a localização atual do usuário
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeout: 3000,
          maximumAge: 1000,
        });

        //Define a localização atual e ajusta a região do mapa
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

  //Função para salvar um ponto
  const savePoint = async () => {
    //Valida se um ponto foi selecionado e se a descrição está preenchida
    if (!selectedPoint || !description.trim()) {
      Alert.alert('Erro', 'Selecione um ponto e adicione uma descrição.');
      return;
    }

    //Pergunta ao usuário se o ponto é um restaurante ou um posto
    Alert.alert(
      'Tipo de Ponto',
      'Esse ponto é um Restaurante ou Posto de Combustível?',
      [
        {
          text: 'Restaurante',
          onPress: async () => {
            const newPoint = {
              latitude: selectedPoint.latitude,
              longitude: selectedPoint.longitude,
              description,
              type: 'restaurante',
            };

            try {
              //Salva o ponto como restaurante
              //await StrapiClient.post('/pontos-ifoods', {
              //  data: newPoint, // Envia os dados como 'data'
              //});

              setPoints([...points, newPoint]); //Atualiza o estado com o novo ponto
              resetAddPoint();
            } catch (error) {
              console.error('Erro ao salvar ponto como Restaurante:', error);
              Alert.alert('Erro', 'Não foi possível salvar o ponto.');
            }
          },
        },
        {
          text: 'Posto de Combustível',
          onPress: async () => {
            const newPoint = {
              latitude: selectedPoint.latitude,
              longitude: selectedPoint.longitude,
              description,
              type: 'posto',
            };

            try {
              //Salva o ponto como posto de combustível
              //await StrapiClient.post('/pontos-abastecimentos', {
              //  data: newPoint, //Envia os dados como 'data'
              //});

              setPoints([...points, newPoint]); //Atualiza o estado com o novo ponto
              resetAddPoint();
            } catch (error) {
              console.error('Erro ao salvar ponto como Posto de Combustível:', error);
              Alert.alert('Erro', 'Não foi possível salvar o ponto.');
            }
          },
        },
      ]

    );
  };

  //Função para resetar o estado de adição de pontos
  const resetAddPoint = () => {
    Alert.alert('Sucesso', 'Ponto salvo com sucesso!');
    setIsPontoAdd(false); //Sai do modo de adição
    setSelectedPoint(null); //Remove o ponto selecionado
    setDescription(''); //Limpa a descrição
  };

  return (
    <View style={[AddPointStyles.container, themeStyles.screenBackground]}>
      <Text style={[AddPointStyles.title, themeStyles.text]}>RESTAURANTES & POSTOS</Text>
      {/* Mapa */}
      <MapView
        key={isDarkMode ? 'dark' : 'light'}
        region={mapRegion}
        customMapStyle={themeStyles.mapStyle}
        showsUserLocation={true} //Exibe o ícone de localização do usuário
        zoomEnabled={true} //Permite zoom
        zoomControlEnabled={true} //Exibe controles de zoom no mapa
        style={AddPointStyles.map}
        onPress={(e) => {
          //Permite selecionar um ponto no mapa apenas se estiver no modo de adição
          if (isPontoAdd) {
            setSelectedPoint(e.nativeEvent.coordinate);
          }
        }}
      >
        {/* Marker para a localização atual */}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Minha Localização"
            pinColor="blue"
          />
        )}

        {/* Markers para os pontos salvos */}
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.description}
          >
            {/* Usando o ícone da biblioteca MaterialIcons */}
            <Icon
              name={point.type === 'restaurante' ? 'restaurant' : 'local-gas-station'}
              size={35}
              color={point.type === 'restaurante' ? 'red' : 'cian'}
            />
          </Marker>
        ))}

        {/* Marker para o ponto selecionado */}
        {selectedPoint && isPontoAdd && (
          <Marker
            coordinate={selectedPoint}
            title="Novo Ponto"
            pinColor="red"
          />
        )}
      </MapView>

      {/* Controles para adicionar e salvar pontos */}
      <View>
        {!isPontoAdd ? (
          //Botão para ativar o modo de adição de pontos
          <TouchableOpacity
            onPress={() => setIsPontoAdd(true)}
          >
            <Text style={[AddPointStyles.btnAdd, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>ADICIONAR PONTO</Text>
          </TouchableOpacity>
        ) : (
          <>
            {/* Campo para inserir a descrição do ponto */}
            <TextInput
              style={[AddPointStyles.inputDesc, themeStyles.input]}
              placeholder="Descrição do Ponto. EX: (Posto, Restaurante)"
              placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
              value={description}
              onChangeText={setDescription}
            />

            <View style={AddPointStyles.containerBtn}>
              {/* Botão para usar a localização atual como ponto */}
              <TouchableOpacity
                onPress={() => {
                  if (currentLocation) {
                    setSelectedPoint(currentLocation);
                  } else {
                    Alert.alert('Erro', 'Localização atual não disponível.');
                  }
                }}
                style={AddPointStyles.buttonContainer}
              >
                <Text style={[AddPointStyles.btnFinal, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>
                  LOCALIZAÇÃO ATUAL
                </Text>
              </TouchableOpacity>

              {/* Botão para salvar o ponto */}
              <TouchableOpacity onPress={savePoint}>
                <Text style={[AddPointStyles.btnFinal, themeStyles.buttonBackgroundScreen, themeStyles.textBackground]}>
                  SALVAR PONTO
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

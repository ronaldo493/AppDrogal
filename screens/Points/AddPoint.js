import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function RestaurantesPostos() {
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
          accuracy: Location.Accuracy.High,
          timeout: 2000,
          maximumAge: 5000,
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
  const savePoint = () => {
    // Valida se um ponto foi selecionado e se a descrição está preenchida
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
          onPress: () => {
            //Salva o ponto como um restaurante
            const newPoint = {
              ...selectedPoint,
              description,
              type: 'restaurante',
            };
            setPoints([...points, newPoint]);
            resetAddPoint(); //Reseta o estado de adição de pontos
          },
        },
        {
          text: 'Posto de Combustível',
          onPress: () => {
            //Salva o ponto como um posto de combustível
            const newPoint = {
              ...selectedPoint,
              description,
              type: 'posto',
            };
            setPoints([...points, newPoint]);
            resetAddPoint(); //Reseta o estado de adição de pontos
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
    <View>
      {/* Mapa */}
      <MapView
        region={mapRegion}
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
            //Define a cor do marcador com base no tipo de ponto
            pinColor={point.type === 'restaurante' ? 'red' : 'orange'}
          />
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
            <Text>Adicionar Ponto</Text>
          </TouchableOpacity>
        ) : (
          <>
            {/* Campo para inserir a descrição do ponto */}
            <TextInput
              placeholder="Descrição do Ponto"
              value={description}
              onChangeText={setDescription}
            />

            <View>
              {/* Botão para usar a localização atual como ponto */}
              <TouchableOpacity
                onPress={() => {
                  if (currentLocation) {
                    setSelectedPoint(currentLocation);
                  } else {
                    Alert.alert('Erro', 'Localização atual não disponível.');
                  }
                }}
              >
                <Text>Usar Localização Atual</Text>
              </TouchableOpacity>

              {/* Botão para salvar o ponto */}
              <TouchableOpacity onPress={savePoint}>
                <Text>Salvar Ponto</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

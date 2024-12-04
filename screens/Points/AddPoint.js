import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function RestaurantesPostos() {
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
  const [isAddingPoint, setIsAddingPoint] = useState(false); // Controla o modo de adição

  // Obtém a localização atual do usuário
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert('Permissão de localização negada');
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 2000,
          maximumAge: 5000,
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

  // Salva o ponto
  const savePoint = () => {
    if (!selectedPoint || !description.trim()) {
      Alert.alert('Erro', 'Selecione um ponto e adicione uma descrição.');
      return;
    }

    // Pergunta se é restaurante ou posto de combustível
    Alert.alert(
      'Tipo de Ponto',
      'Esse ponto é um Restaurante ou Posto de Combustível?',
      [
        {
          text: 'Restaurante',
          onPress: () => {
            const newPoint = {
              ...selectedPoint,
              description,
              type: 'restaurante',
            };
            setPoints([...points, newPoint]);
            resetAddPoint();
          },
        },
        {
          text: 'Posto de Combustível',
          onPress: () => {
            const newPoint = {
              ...selectedPoint,
              description,
              type: 'posto',
            };
            setPoints([...points, newPoint]);
            resetAddPoint();
          },
        },
      ]
    );
  };

  // Reseta o estado de adição de pontos
  const resetAddPoint = () => {
    Alert.alert('Sucesso', 'Ponto salvo com sucesso!');
    setIsAddingPoint(false);
    setSelectedPoint(null);
    setDescription('');
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={(e) => {
          if (isAddingPoint) {
            setSelectedPoint(e.nativeEvent.coordinate);
          }
        }}
      >
        {/* Localização atual */}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Minha Localização"
            pinColor="blue"
          />
        )}

        {/* Pontos salvos */}
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.description}
            pinColor={point.type === 'restaurante' ? 'red' : 'orange'}
          />
        ))}

        {/* Ponto selecionado */}
        {selectedPoint && isAddingPoint && (
          <Marker
            coordinate={selectedPoint}
            title="Novo Ponto"
            pinColor="purple"
          />
        )}
      </MapView>

      {/* Controles */}
      <View style={styles.controls}>
        {!isAddingPoint ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddingPoint(true)}
          >
            <Text style={styles.addButtonText}>Adicionar Ponto</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Descrição do Ponto"
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (currentLocation) {
                    setSelectedPoint(currentLocation);
                  } else {
                    Alert.alert('Erro', 'Localização atual não disponível.');
                  }
                }}
              >
                <Text style={styles.buttonText}>Usar Localização Atual</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={savePoint}>
                <Text style={styles.buttonText}>Salvar Ponto</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

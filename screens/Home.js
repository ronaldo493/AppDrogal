import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import RouteList from '../components/RouteList';
import styles from '../components/styles/HomeStyles';

export default function Home() {
  const [routes, setRoutes] = useState([]);

  const handleAddRoute = (filial) => {
    setRoutes([...routes, filial]);
  };

  const handleRemoveRoute = (filialToRemove) => {
    setRoutes(routes.filter(filial => filial.codigofilial !== filialToRemove.codigofilial));
  };

  const handleTraceRoute = () => {
    if (routes.length === 0) {
      Alert.alert('Nenhuma filial selecionada', 'Adicione uma Filial para traçar uma rota.');
      return;
    }

    // Lógica para abrir o aplicativo de mapas com a rota traçada
    // Exemplo: abrirGoogleMaps(routes);
    Alert.alert('Traçar Rota', 'Aqui será aberto o aplicativo de mapas.');
  };

  return (
    <View style={styles.container}>
      <SearchBar onAddRoute={handleAddRoute} />
      <RouteList routes={routes} onRemoveRoute={handleRemoveRoute} />
      <Button title="Traçar Rota" onPress={handleTraceRoute} />
    </View>
  );
}

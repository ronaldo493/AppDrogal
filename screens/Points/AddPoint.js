import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../../components/ThemeContext';
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 
import MapaLojasStyles, { darkMapStyle } from '../styles/MapaLojasStyles';

export default function AddPoint({ navigation }) {
  // Modo escuro
  const { isDarkMode } = useTheme();
  const themeStyles = getThemeStyles(isDarkMode);

  const [mapRegion, setMapRegion] = useState({
    latitude: -22.7277,
    longitude: -47.6490,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [marker, setMarker] = useState(null);

  return (
    <View>
      <TextInput
        style={[MapaLojasStyles.input, themeStyles.input]}
        placeholder="Descrição do Ponto (Ex: Restaurante Alelo)"
        placeholderTextColor={isDarkMode ? '#ccc' : '#333'}
      />

<MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={MapaLojasStyles.map}
        region={mapRegion}
        customMapStyle={isDarkMode ? darkMapStyle : []}
      >
        {marker && (
          <Marker
            coordinate={marker}
            title="Localização Atual"
            pinColor="blue"
          />
        )}

      </MapView>

    </View>
  );
}

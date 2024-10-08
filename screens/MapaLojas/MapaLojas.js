import React from 'react';
import { View, Text } from 'react-native';
import {MapView, Marker } from './map';
import filiaisData from '../../data/filiais.json';
import MapaLojasStyles, {darkMapStyle} from '../styles/MapaLojasStyles';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 

const MapaLojas = () => {
  //Modo escuro
  const { isDarkMode, toggleTheme } = useTheme(); 
  const themeStyles = getThemeStyles(isDarkMode);

  //Coordenadas de Piracicaba onde o mapa irá inciar
  const piracicabaCoordinates = {
    latitude: -22.7277,
    longitude: -47.6490,
  };

  // Filtra as filiais de São Paulo e Minas Gerais
  const filiaisSP = filiaisData.filter(filial => filial.uf === 'SP');
  const filiaisMG = filiaisData.filter(filial => filial.uf === 'MG');

  return (
    <View style={[MapaLojasStyles.container, themeStyles.screenBackground]}>
      <Text style={[MapaLojasStyles.title, themeStyles.text, themeStyles.textBackground]}>ESTADO DE SÃO PAULO: {filiaisSP.length} LOJAS</Text>
      <Text style={[MapaLojasStyles.title, themeStyles.text, themeStyles.textBackground]}>ESTADO DE MINAS GERAIS: {filiaisMG.length} LOJAS</Text>

      <MapView
        style={MapaLojasStyles.map}
        initialRegion={{
          ...piracicabaCoordinates,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        customMapStyle={isDarkMode ? darkMapStyle : []}
      >
        {filiaisData.map(filial => {
          const latitude = parseFloat(filial.latitude?.replace(',', '.'));
          const longitude = parseFloat(filial.longitude?.replace(',', '.'));

          if (latitude && longitude) {
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

import { StyleSheet } from 'react-native';

const MapaLojasStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
      marginHorizontal: 15,
      marginBottom: 10,
    },
    title: {
      fontSize: 15,
      padding: 15,
      margin: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      borderRadius: 8,
    },
  });

export default MapaLojasStyles;


//Estilo do mapa Escuro
export const darkMapStyle = [
  {
    elementType: 'geometry', // Altera o fundo do mapa.
    stylers: [{ color: '#212121' }], // Define a cor do fundo como cinza escuro.
  },
  {
    elementType: 'labels.icon', // Controla ícones de rótulos no mapa.
    stylers: [{ visibility: 'off' }], // Esconde os ícones.
  },
  {
    elementType: 'labels.text.fill', // Altera a cor do texto dos rótulos.
    stylers: [{ color: '#757575' }], // Define a cor do texto como cinza claro.
  },
  {
    elementType: 'labels.text.stroke', // Adiciona um contorno ao texto.
    stylers: [{ color: '#212121' }], // Define a cor do contorno como cinza escuro.
  },
  {
    featureType: 'administrative.land_parcel', // Estilo para áreas administrativas.
    elementType: 'labels.text.fill', // Altera a cor do texto para essas áreas.
    stylers: [{ color: '#757575' }], // Define a cor do texto como cinza claro.
  },
  {
    featureType: 'poi', // Estilo para pontos de interesse (POIs).
    elementType: 'labels.text.fill', // Altera a cor do texto dos POIs.
    stylers: [{ color: '#757575' }], // Define a cor do texto como cinza claro.
  },
  {
    featureType: 'road', // Estilo para estradas.
    elementType: 'geometry', // Altera a aparência das estradas.
    stylers: [{ color: '#383838' }], // Define a cor das estradas como cinza mais claro.
  },
  {
    featureType: 'road', // Estilo para estradas novamente.
    elementType: 'labels.text.fill', // Altera a cor do texto das estradas.
    stylers: [{ color: '#ffffff' }], // Define a cor do texto das estradas como branco.
  },
  {
    featureType: 'water', // Estilo para corpos d'água.
    elementType: 'geometry', // Altera a aparência da água.
    stylers: [{ color: '#000000' }], // Define a cor da água como preta.
  },
];

  



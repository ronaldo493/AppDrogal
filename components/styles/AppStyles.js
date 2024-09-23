import { StyleSheet} from 'react-native';

export default StyleSheet.create({
    optionsContainer: {
      position: 'absolute',
      top: 60, // Ajuste a posição conforme necessário
      right: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      elevation: 3, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    optionButton: {
      padding: 10,
    },
    optionText: {
      color: '#333',
    },
  });
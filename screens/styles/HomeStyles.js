import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window'); //Ajustar automaticamente

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  logoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },

  logo: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: 'contain', //Mantém a proporção
  },
  
  routeContainer: {
    flex: 1,
  },
  
});

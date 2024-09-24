import { Linking, Alert } from 'react-native';

const MapService = {
  openGoogleMapsRoute: (routes) => {
    if (routes.length === 0) return;

    const baseUrl = 'https://www.google.com/maps/dir/?api=1';
    const origin = `&origin=${routes[0].latitude},${routes[0].longitude}`; // Localização atual
    const waypoints = routes.slice(1, routes.length - 1).map(route => `${route.latitude},${route.longitude}`).join('|');
    const destination = `&destination=${routes[routes.length - 1].latitude},${routes[routes.length - 1].longitude}`;
    const travelMode = '&travelmode=driving';

    const url = `${baseUrl}${origin}&waypoints=${waypoints}${destination}${travelMode}`;
    Linking.openURL(url);
  },

  openWazeRoute: (routes) => {
    if (routes.length === 0) return;

    const baseUrl = 'waze://?ll=';
    const destination = `${routes[routes.length - 1].latitude},${routes[routes.length - 1].longitude}`;
    const url = `${baseUrl}${destination}&navigate=yes`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Waze não encontrado', 'Por favor, instale o Waze para navegar.');
    });
  }
};

export default MapService;

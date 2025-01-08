import { Alert, Linking } from 'react-native';

const MapService = {
  openGoogleMapsRoute: (routes) => {
    if (routes.length === 0) return;

    //URL base do Google Maps para direções
    const baseUrl = 'https://www.google.com/maps/dir/?api=1';
     
    //Cria uma string com os pontos intermediários (waypoints), exceto o último
    const waypoints = routes.slice(0, routes.length - 1).map(route => `${route.latitude},${route.longitude}`).join('|');
    
    //Se houver waypoints, adiciona o parâmetro na URL
    const waypointsParam = waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : '';
    
    //Cria o parâmetro de destino usando o último ponto
    const destination = `&destination=${encodeURIComponent(routes[routes.length - 1].latitude)},${encodeURIComponent(routes[routes.length - 1].longitude)}`;
    
    //Define o modo de viagem como "driving" (dirigindo)
    const travelMode = '&travelmode=driving';

    //Constrói a URL final com todos os parâmetros
    const url = `${baseUrl}${waypointsParam}${destination}${travelMode}`;
    
    Linking.openURL(url);
  },

  openWazeRoute: (routes) => {
    if (routes.length === 0) return;

     //URL base do Waze para direções
     const baseUrl = 'waze://?ll=';
    
     //Cria o parâmetro de destino usando o último ponto
     const destination = `${encodeURIComponent(routes[routes.length - 1].latitude)},${encodeURIComponent(routes[routes.length - 1].longitude)}`;
     
     //Constrói a URL final para o Waze
     const url = `${baseUrl}${destination}&navigate=yes`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Waze não encontrado', 'Por favor, instale o Waze para navegar.');
    });
  }
};

export default MapService;

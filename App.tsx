import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Home from './screens/Home';
import Settings from './screens/Settings';
import Historico from './screens/Historico';
import MapaLojas from './screens/MapaLojas';
import Sidebar from './components/Sidebar';

const Drawer = createDrawerNavigator();

export default function App() {
  // Função para lidar com o clique no ícone de login
  const handleLoginPress = () => {
    //...
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        screenOptions={{
          headerShown: true, //Mostra o cabeçalho
          headerTitle: '',   //Remove o título da tela
          headerRight: () => (
            <TouchableOpacity onPress={handleLoginPress} style={{ marginRight: 15 }}>
              <Icon name="account-circle" size={28} color="#000" /> 
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={{ headerTitle: '' }} 
        />
        <Drawer.Screen 
          name="Historico" 
          component={Historico} 
          options={{ headerTitle: '' }} 
        />
        <Drawer.Screen 
          name="MapaLojas" 
          component={MapaLojas} 
          options={{ headerTitle: '' }} 
        />
        <Drawer.Screen 
          name="Settings" 
          component={Settings} 
          options={{ headerTitle: '' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

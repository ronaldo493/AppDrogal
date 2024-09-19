import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Sidebar from './components/Sidebar';
import Historico from './screens/Historico';
import MapaLojas from './screens/MapaLojas';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Historico" component={Historico} />
        <Drawer.Screen name="MapaLojas" component={MapaLojas} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, StatusBar  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Home from './screens/Home';
import Settings from './screens/Settings/Settings';
import Historico from './screens/Historico';
import Chamados from './screens/Chamados';
import Preventiva from './screens/Preventiva';
import MapaLojas from './screens/MapaLojas/MapaLojas';
import Sidebar from './components/Sidebar';
import Suporte from './screens/Settings/Suporte';
import About from './screens/Settings/About';
import { ThemeProvider, useTheme } from './components/ThemeContext';


const Drawer = createDrawerNavigator();

//Componente principal, fornecerá o tema para todo o APP
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}

//Componente de navegação, que agora usará o tema
function AppNavigation() {
  const { isDarkMode } = useTheme();

  //Função para lidar com o clique no ícone de login
  const handleLoginPress = () => {
    //...
  };

  return (
      <>  
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}  //Estilo dos ícones da barra de status
          backgroundColor={isDarkMode ? '#333' : '#f0f0f0'}  
        />
        <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          screenOptions={{
            headerShown: true, //Mostra o cabeçalho
            headerTitle: '',   //Remove o título da tela
            headerStyle: {
              backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
            },
            headerTintColor: isDarkMode ? '#B0B3B8' : '#000000',
            headerRight: () => (
              <TouchableOpacity onPress={handleLoginPress} style={{ marginRight: 15 }}>
                <Icon name="account-circle" size={28} color={isDarkMode ? '#B0B3B8' : '#000'} /> 
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
            name="Chamados" 
            component={Chamados} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Preventiva" 
            component={Preventiva} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Settings" 
            component={Settings} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Suporte" 
            component={Suporte} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="About" 
            component={About} 
            options={{ headerTitle: '' }} 
          />

        </Drawer.Navigator>
      </NavigationContainer>  
    </> 
  );
}



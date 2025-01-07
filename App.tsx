import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';  //Gerencia a navegação principal da aplicação
import { createDrawerNavigator } from '@react-navigation/drawer'; //Cria o menu lateral (drawer)
import { createStackNavigator } from '@react-navigation/stack'; //Cria um Stack Navigator
import { StatusBar } from 'react-native';
import {  Provider as PaperProvider, MD2DarkTheme, MD2LightTheme }  from 'react-native-paper';
import Home from './screens/Home';
import Settings from './screens/Settings/Settings';
import Historico from './screens/Historico';
import Chamados from './screens/Chamados';
import Login from './screens/Auth/Login';
import Preventiva from './screens/Preventiva/Preventiva';
import MapaLojas from './screens/MapaLojas';
import Sidebar from './components/Sidebar';
import Suporte from './screens/Settings/Suporte';
import AddPoint from './screens/AddPoint';
import About from './screens/Settings/About';
import HeaderMenu from './components/HeaderMenu';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { StrapiProvider } from './components/StrapiContext';
import { getThemeStyles } from './components/styles/ThemeStyles'; 
import PatrimonioAssinatura from './screens/Preventiva/PatrimonioAssinatura';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Componente principal, fornecerá o tema para todo o APP
export default function App() {
  return (
        <StrapiProvider>
          <ThemeProvider>
            <AppWithTheme />
          </ThemeProvider>
        </StrapiProvider>  
  );
}

//Componente que usa o tema no menu
function AppWithTheme() {
  const { isDarkMode } = useTheme();
  return (
    <PaperProvider theme={isDarkMode ? MD2DarkTheme : MD2LightTheme}>
      <AppNavigation />
    </PaperProvider>
  );
}

//Componente de navegação, que agora usará o tema
function AppNavigation() {

  //Modo Escuro
  const { isDarkMode } = useTheme();
  const ThemeStyles = getThemeStyles(isDarkMode);
 
  return (
      <>  
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}  //Estilo dos ícones da barra de status
          backgroundColor={isDarkMode ? '#333' : '#f0f0f0'}  
        />
        <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          screenOptions={({ navigation }) => ({ 
            headerShown: true, //Mostra o cabeçalho
            headerTitle: '',   //Remove o título da tela
            headerStyle: {
              backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
            },
            headerTintColor: isDarkMode ? '#B0B3B8' : '#000000',
            headerRight: () => (
              <HeaderMenu navigation={navigation}  themeStyles={ThemeStyles} />
            ),
          })}
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
            name="AddPoint" 
            component={AddPoint} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Chamados" 
            component={Chamados} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Preventiva" 
            component={PreventivaStack} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Login" 
            component={Login} 
            options={{ headerTitle: '' }} 
          />
          <Drawer.Screen 
            name="Settings" 
            component={SettingsStack} 
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

//Stack para a tela de Configurações
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsMenu" component={Settings} options={{ headerShown: false }}  />
      <Stack.Screen name="Suporte" component={Suporte} options={{ headerShown: false }} />
      <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

//Stack para a tela de Preventiva
function PreventivaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PreventivaScreen" component={Preventiva} options={{ headerShown: false }}  />
      <Stack.Screen name="PatrimonioAssinatura" component={PatrimonioAssinatura} options={{ headerShown: false }}  />
    </Stack.Navigator>
  )
}


import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';  //Gerencia a navegação principal da aplicação
import { createDrawerNavigator } from '@react-navigation/drawer'; //Cria o menu lateral (drawer)
import { createStackNavigator } from '@react-navigation/stack'; //Cria um Stack Navigator
import { TouchableOpacity, StatusBar, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; //Icones
import { Menu, Provider as PaperProvider, Divider, MD2DarkTheme, MD2LightTheme }  from 'react-native-paper'; //Menu Suspenso
import Home from './screens/Home';
import Settings from './screens/Settings/Settings';
import Historico from './screens/Historico';
import Chamados from './screens/Chamados';
import Preventiva from './screens/Preventiva/Preventiva';
import MapaLojas from './screens/MapaLojas';
import Sidebar from './components/Sidebar';
import Suporte from './screens/Settings/Suporte';
import About from './screens/Settings/About';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { getThemeStyles } from './components/styles/ThemeStyles'; 
import PatrimonioAssinatura from './screens/Preventiva/PatrimonioAssinatura';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Componente principal, fornecerá o tema para todo o APP
export default function App() {
  return (
      <ThemeProvider>
         <AppWithTheme />
      </ThemeProvider>
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

  //Controla o estado da visibilidade do Menu(Icone)
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);

  //Função para abrir Menu(Icone)
  const openMenu = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    setAnchorPosition({ x: pageX, y: pageY, });
    setIsMenuVisible(true);
  }

  //Função para Fechar Menu(Icone)
  const closeMenu = () => {
    setIsMenuVisible(false);
  }
 
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
              <>
                <TouchableOpacity onPress={openMenu} style={{ marginRight: 10, padding: 9 }} >
                <Icon name="account-circle" size={28} color={isDarkMode ? '#B0B3B8' : '#000'} /> 
                </TouchableOpacity>
                <Menu   
                  visible={isMenuVisible}
                  onDismiss={closeMenu}
                  anchor={{ x: anchorPosition?.x || 0, y: anchorPosition?.y || 0}}
                >
                  <Menu.Item  onPress={() => { closeMenu(); navigation.navigate('Settings');}} title="Configurações" titleStyle={ThemeStyles.textMenu}  />
                  <Divider />
                  <Menu.Item  onPress={() => { closeMenu(); }} title="Meu Perfil" titleStyle={ThemeStyles.textMenu} />
                  <Divider />
                  <Menu.Item  onPress={() => { closeMenu(); }} title="Sair" titleStyle={ThemeStyles.textMenu} />
                </Menu>
              </>
              
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


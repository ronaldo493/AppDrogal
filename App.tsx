import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';  //Gerencia a navegação principal da aplicação
import { createDrawerNavigator } from '@react-navigation/drawer'; //Cria o menu lateral (drawer)
import { TouchableOpacity, StatusBar, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; //Icones
import { Menu, Provider as PaperProvider, Divider, MD3DarkTheme, MD3LightTheme }  from 'react-native-paper'; //Menu DropDown
import Home from './screens/Home';
import Settings from './screens/Settings/Settings';
import Historico from './screens/Historico';
import Chamados from './screens/Chamados';
import Preventiva from './screens/Preventiva';
import MapaLojas from './screens/MapaLojas';
import Sidebar from './components/Sidebar';
import Suporte from './screens/Settings/Suporte';
import About from './screens/Settings/About';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { getThemeStyles } from './components/styles/ThemeStyles'; 

const Drawer = createDrawerNavigator();

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
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
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
    setAnchorPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
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
          screenOptions={{
            headerShown: true, //Mostra o cabeçalho
            headerTitle: '',   //Remove o título da tela
            headerStyle: {
              backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
            },
            headerTintColor: isDarkMode ? '#B0B3B8' : '#000000',
            headerRight: () => (
              <>
                <TouchableOpacity onPress={openMenu} style={{ marginRight: 15, padding: 15 }} >
                <Icon name="account-circle" size={28} color={isDarkMode ? '#B0B3B8' : '#000'} /> 
                </TouchableOpacity>
                <Menu   
                  visible={isMenuVisible}
                  onDismiss={closeMenu}
                  anchor={{ x: anchorPosition?.x || 0, y: anchorPosition?.y || 0}}
                >
                  <Menu.Item onPress={() => { closeMenu(); }} title="Configurações" titleStyle={ThemeStyles.textMenu}  />
                  <Divider />
                  <Menu.Item  onPress={() => { closeMenu(); }} title="Conta" titleStyle={ThemeStyles.textMenu} />
                  <Divider />
                  <Menu.Item  onPress={() => { closeMenu(); }} title="Sair" titleStyle={ThemeStyles.textMenu} />
                </Menu>
              </>
              
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



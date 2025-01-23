import { createDrawerNavigator } from '@react-navigation/drawer'; //Cria o menu lateral (drawer)
import { NavigationContainer } from '@react-navigation/native'; //Gerencia a navegação principal da aplicação
import { createStackNavigator } from '@react-navigation/stack'; //Cria um Stack Navigator
import { StatusBar, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { MD2DarkTheme, MD2LightTheme, Provider as PaperProvider } from 'react-native-paper';
import HeaderMenu from './components/HeaderMenu';
import Sidebar from './components/Sidebar';
import { getThemeStyles } from './components/styles/ThemeStyles';
import { StrapiProvider } from './context/StrapiContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import AddPoint from './screens/AddPoint';
import Login from './screens/Auth/Login';
import Chamados from './screens/Chamados';
import Historico from './screens/Historico';
import Home from './screens/Home';
import MapaLojas from './screens/MapaLojas';
import PatrimonioAssinatura from './screens/Preventiva/PatrimonioAssinatura';
import Preventiva from './screens/Preventiva/Preventiva';
import About from './screens/Settings/About';
import Settings from './screens/Settings/Settings';
import Suporte from './screens/Settings/Suporte';
import { AuthProvider, publicKey, useAuthContext } from './context/AuthContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Componente principal, fornecerá o tema para todo o APP
export default function App() {
  return (
      <AuthProvider>
        <StrapiProvider>
          <ThemeProvider>
            <AppWithTheme />
          </ThemeProvider>
        </StrapiProvider> 
      </AuthProvider>
         
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
  const { token, loading, isLoggedIn } = useAuthContext(); //Verifica se o tem o token
  
  //Modo Escuro
  const { isDarkMode } = useTheme();
  const ThemeStyles = getThemeStyles(isDarkMode);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
 
  return (
      <>  
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}  //Estilo dos ícones da barra de status
          backgroundColor={isDarkMode ? '#333' : '#f0f0f0'}  
        />
        <NavigationContainer>
        {!isLoggedIn() ? (
          <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }}  // Remover topo na tela de login
            />
          </Stack.Navigator>
        ) : (
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
        )}
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


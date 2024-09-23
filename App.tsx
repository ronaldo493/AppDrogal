import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Pressable, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import AppStyles from './components/styles/AppStyles';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Historico from './screens/Historico';
import MapaLojas from './screens/MapaLojas';
import Sidebar from './components/Sidebar';

const Drawer = createDrawerNavigator();

export default function App() {

  const [showOptions, setShowOptions] = useState(false);
  
  //Função para lidar com o clique no ícone de login
  const handleLoginPress = () => {
    setShowOptions(prev => !prev);
  };
   //Função para fechar as opções
   const handleCloseOptions = () => {
    setShowOptions(false);
  };

  return (
  <Pressable onPress={handleCloseOptions} style={{flex: 1}}>
    <NavigationContainer>
      <Drawer.Navigator
      //MENU LATERAL E ÍCONE DE LOGIN
        drawerContent={(props) => <Sidebar {...props} />}
        screenOptions={{
          headerShown: true, //Mostra o cabeçalho
          headerTitle: '',   //Remove o título da tela
          headerRight: () => (
            <TouchableOpacity onPress={handleLoginPress} style={{ marginRight: 15 }}>
              <Icon name="account-circle" size={28} color="#000" /> 
            </TouchableOpacity>
          ),
          drawerType: 'back', // Para melhorar a experiência ao abrir o drawer
          // Adiciona eventos para o drawer
          onDrawerOpen={handleCloseOptions}
          onDrawerClose={handleCloseOptions}
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
      {showOptions && (
        //VIEW DO LOGIN
        <View style={AppStyles.optionsContainer}>
          <TouchableOpacity onPress={() => { setShowOptions(false); handleCloseOptions(); }} style={AppStyles.optionButton}>
            <Text style={AppStyles.optionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowOptions(false); handleCloseOptions(); }} style={AppStyles.optionButton}>
            <Text style={AppStyles.optionText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )};
    </NavigationContainer>
  </Pressable>
  );
}

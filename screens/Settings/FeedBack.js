import React from 'react';
import { View, Text} from 'react-native';
import FeedBackStyles from '../../screens/styles/FeedBackStyles';
import { useTheme } from '../../components/ThemeContext'; 
import { getThemeStyles } from '../../components/styles/ThemeStyles'; 

export default function Feedback (){
    //Modo escuro
    const { isDarkMode, toggleTheme } = useTheme(); 
    const themeStyles = getThemeStyles(isDarkMode);

  return (
    <View style={[FeedBackStyles.container,themeStyles.screenBackground]}>
      <Text style={themeStyles.text}>Em Desenvolvimento</Text>
    </View>
  );
};

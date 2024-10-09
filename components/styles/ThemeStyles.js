import { Button, StyleSheet } from 'react-native';

const lightTheme = {
    text: '#000',
    screenText: '#000',
    sidebar: '#f0f0f0',
    borderBottomColor: '#ddd',
    screenBackground: '#f5f5f5',
};

const darkTheme = {
    text: '#cccccc',
    screenText: '#E0E0E0',
    sidebar: '#2E2E2C',
    borderBottomColor: '#555553',
    screenBackground: '#080808',
};

export const getThemeStyles = (isDarkMode) =>
    StyleSheet.create({
        //SIDEBAR
        sidebar: {
            backgroundColor: isDarkMode ? darkTheme.sidebar : lightTheme.sidebar,
        },
        text: {
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        buttonBackgroundSide: {
            backgroundColor: isDarkMode ? '#555' : '#ccc',
        },
        //SCREEN
        screenText: {
            color: isDarkMode ? darkTheme.screenText : lightTheme.screenText,
        },
        screenBackground: {
            backgroundColor: isDarkMode ? darkTheme.screenBackground: lightTheme.screenBackground
        },
        borderBottomColor: {
            borderBottomColor: isDarkMode ? darkTheme.borderBottomColor : lightTheme.borderBottomColor,
        },
        radiusBackground: {
            backgroundColor: isDarkMode ? '#222' : '#ddd',
        },


        //BUTTON
        textBackground: {
            backgroundColor: isDarkMode ? '#555553' : '#BB5059',
            color: 'white',
        },
        buttonBackgroundScreen: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 8,
            borderRadius: 4,
            elevation: 4,
        },

        //INPUT & SEARCH
        listSearch: {
            backgroundColor: isDarkMode ? '#4d4d4d' : '#dddddd',
        },
        input: {
            borderWidth: 0.8,
            borderColor: isDarkMode ? '#777777' : '#2196F3',
            color: isDarkMode ? '#ffffff' : '#000000'
        },
        
        //ROTAS LISTAS
        listRoutes: {
            backgroundColor: isDarkMode ? '#D3D3D3' : '#dddddd',
        }
    });

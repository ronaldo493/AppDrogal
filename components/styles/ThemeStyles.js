import { Button, StyleSheet } from 'react-native';

const lightTheme = {
    text: '#000',
    screenText: '#000',
    backText: '#BB5059',
    sidebar: '#f0f0f0',
    borderBottomColor: '#ddd',
    screenBackground: '#f5f5f5',
};

const darkTheme = {
    text: '#cccccc',
    screenText: '#E0E0E0',
    backText: '#555553',
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
        textBackground: {
            backgroundColor: isDarkMode ? darkTheme.backText : lightTheme.backText,
        },
        buttonBackgroundScreen: {
            backgroundColor: isDarkMode ? '#555' : '#ccc',
        },
    });

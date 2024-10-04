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
        buttonBackground: {
            backgroundColor: isDarkMode ? '#555' : '#ccc',
        },
        radiusBackground: {
            backgroundColor: isDarkMode ? '#222' : '#ddd',
        },
    });

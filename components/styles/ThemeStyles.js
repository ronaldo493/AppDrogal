import { Button, StyleSheet } from 'react-native';

const lightTheme = {
    text: '#000',
    sidebar: '#f0f0f0',
    borderBottomColor: '#ddd',
};

const darkTheme = {
    text: '#cccccc',
    sidebar: '#3E3E3C',
    borderBottomColor: '#555553',
};

export const getThemeStyles = (isDarkMode) =>
    StyleSheet.create({
        text: {
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        sidebar: {
            backgroundColor: isDarkMode ? darkTheme.sidebar : lightTheme.sidebar,
        },
        borderBottomColor: {
            borderBottomColor: isDarkMode ? darkTheme.borderBottomColor : lightTheme.borderBottomColor,
        },
        buttonBackground: {
            backgroundColor: isDarkMode ? '#555' : '#ccc',
        },
        headerBackground: {
            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
        },
    });

import { Button, StyleSheet } from 'react-native';

const lightTheme = {
    background: '#fff',
    text: '#000',
    sidebar: '#f0f0f0',
};

const darkTheme = {
    background: '#222',
    text: '#cccccc',
    sidebar: '#3E3E3C',
};

export const getThemeStyles = (isDarkMode) =>
    StyleSheet.create({
        container: {
            backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
        },
        text: {
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        },
        sidebar: {
            backgroundColor: isDarkMode ? darkTheme.sidebar : lightTheme.sidebar,
        },
    });

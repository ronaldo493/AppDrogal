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
    screenBackground: '#101010',
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
        textMenu: {
            color: isDarkMode ? darkTheme.text : lightTheme.text,
            paddingVertical: 10,
            paddingHorizontal: 25,
        },
        buttonBackgroundSide: {
            backgroundColor: isDarkMode ? '#888' : '#bbb',
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
        textImp: {
            color: isDarkMode ? '#B22222' : '#B22222',
            fontStyle: 'italic',
        },  

        //MODAL
        contentModal: {
            backgroundColor: isDarkMode ? '#333' : '#ddd',
        },
        titleModal: {
            color: isDarkMode ? '#fff' : '#000',
        },
        buttonModal: {
            backgroundColor: isDarkMode ? '#555' : '#aaa',
        },
        textModal: {
            color: isDarkMode ? '#fff' : '#111',
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
        buttonSelected: {
            backgroundColor: isDarkMode ? '#007bff' : '#BB5059',
        },
        buttonBack: {
            backgroundColor: isDarkMode ? '#222' : '#ddd',
            padding: 14,
            borderRadius: 12,
            elevation: 2,
            alignItems: 'center',
        },

        //INPUT & SEARCH
        listSearch: {
            backgroundColor: isDarkMode ? '#4d4d4d' : '#dddddd',
        },
        input: {
            borderWidth: 0.8,
            borderColor: isDarkMode ? '#777777' : '#2196F3',
            color: isDarkMode ? '#ffffff' : '#000000',
            backgroundColor: isDarkMode ? '#555' : '#ccc',
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            borderWidth: 0.5,
            padding: 8,
            borderRadius: 4,
        },
        inputPatrimonio: {
            borderWidth: 0.4,
            borderColor: isDarkMode ? '#777777' : '#2196F3',
            color: isDarkMode ? '#ffffff' : '#000000',
            backgroundColor: isDarkMode ? '#555' : '#ccc',
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            borderWidth: 0.5,
            padding: 4,
            borderRadius: 4,
        },
        
        //ROTAS LISTAS
        listRoutes: {
            backgroundColor: isDarkMode ? '#A9A9A9' : '#dddddd',
        },

        //LOGO IMAGEM
        logoImg: {
            opacity: isDarkMode ? 0.2 : 0.6,
        },

        //PREVENTIVAS
        checklistContainerTheme: {
            backgroundColor: isDarkMode ? '#111' : '#f5f5f5',
        },
        checklistItemTheme: {
            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
            color: isDarkMode ? darkTheme.text : lightTheme.text,
        }
    });


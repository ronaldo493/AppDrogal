import { Button, StyleSheet } from 'react-native';

const lightTheme = {
    text: '#000',
    screenText: '#000',
    sidebar: '#e7e7e7',
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

//Estilo do mapa Escuro
export const darkMapStyle  = [
    {
        elementType: 'geometry', //Altera o fundo do mapa.
        stylers: [{ color: '#1d1d1d' }], //Cor de fundo mais suave e escura, para uma aparência menos agressiva.
      },
      {
        elementType: 'labels.icon', //Controla ícones de rótulos no mapa.
        stylers: [{ visibility: 'off' }], //Esconde os ícones.
      },
      {
        elementType: 'labels.text.fill', //Altera a cor do texto dos rótulos.
        stylers: [{ color: '#b0b0b0' }], //Texto em um cinza mais claro, para maior contraste.
      },
      {
        elementType: 'labels.text.stroke', //Adiciona um contorno ao texto.
        stylers: [{ color: '#1d1d1d' }], //Contorno do texto em cinza escuro, combinando com o fundo.
      },
      {
        featureType: 'administrative.land_parcel', //Estilo para áreas administrativas.
        elementType: 'labels.text.fill', //Altera a cor do texto para essas áreas.
        stylers: [{ color: '#b0b0b0' }], //Cinza claro para o texto das áreas administrativas.
      },
      {
        featureType: 'poi', //Estilo para pontos de interesse (POIs).
        elementType: 'labels.text.fill', //Altera a cor do texto dos POIs.
        stylers: [{ color: '#8d8d8d' }], //Cinza médio para pontos de interesse, proporcionando uma leve distinção.
      },
      {
        featureType: 'road', //Estilo para estradas.
        elementType: 'geometry', //Altera a aparência das estradas.
        stylers: [{ color: '#555555' }], //Estradas com um tom de cinza mais claro, mas ainda suave.
      },
      {
        featureType: 'road', //Estilo para estradas novamente.
        elementType: 'labels.text.fill', //Altera a cor do texto das estradas.
        stylers: [{ color: '#ffffff' }], //Texto das estradas em branco, destacando-se do fundo escuro.
      },
      {
        featureType: 'water', //Estilo para corpos d'água.
        elementType: 'geometry', //Altera a aparência da água.
        stylers: [{ color: '#2c3e50' }], //Água com um tom de azul escuro, criando contraste suave e agradável.
      },
  ];
  
  //Estilo do mapa Claro
  export const lightMapStyle = [
    {
        elementType: 'geometry', //Altera o fundo do mapa.
        stylers: [{ color: '#f4f8f4' }], //Fundo suave, mais próximo de um verde claro.
      },
      {
        elementType: 'labels.icon', //Controla ícones de rótulos no mapa.
        stylers: [{ visibility: 'off' }], //Esconde os ícones.
      },
      {
        elementType: 'labels.text.fill', //Altera a cor do texto dos rótulos.
        stylers: [{ color: '#4b8b3f' }], //Verde vibrante para o texto, com bom contraste.
      },
      {
        elementType: 'labels.text.stroke', //Adiciona um contorno ao texto.
        stylers: [{ color: '#f4f8f4' }], //Contorno sutil, combinando com o fundo.
      },
      {
        featureType: 'administrative.land_parcel', //Estilo para áreas administrativas.
        elementType: 'labels.text.fill', //Altera a cor do texto para essas áreas.
        stylers: [{ color: '#4d7031' }], //Verde oliva suave para áreas administrativas.
      },
      {
        featureType: 'poi', //Estilo para pontos de interesse (POIs).
        elementType: 'labels.text.fill', //Altera a cor do texto dos POIs.
        stylers: [{ color: '#567f3b' }], //Verde musgo, criando uma distinção sutil.
      },
      {
        featureType: 'road', //Estilo para estradas.
        elementType: 'geometry', //Altera a aparência das estradas.
        stylers: [{ color: '#cfe8c6' }], //Estradas de um verde suave e delicado.
      },
      {
        featureType: 'road', //Estilo para estradas novamente.
        elementType: 'labels.text.fill', //Altera a cor do texto das estradas.
        stylers: [{ color: '#3a5c37' }], //Texto das estradas em verde escuro, destacando-se suavemente.
      },
      {
        featureType: 'water', //Estilo para corpos d'água.
        elementType: 'geometry', //Altera a aparência da água.
        stylers: [{ color: '#a1c9a7' }], //Água com um tom de verde-água suave.
      },
      {
        featureType: 'river', //Estilo específico para rios.
        elementType: 'geometry', //Altera a aparência dos rios.
        stylers: [{ color: '#75a7b4' }], //Rio em tom de azul suave para destacar.
      },
  ];

export const getThemeStyles = (isDarkMode) =>
    StyleSheet.create({
        //MAPAS
        mapStyle: isDarkMode ? darkMapStyle : lightMapStyle,

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
            fontSize: 14,
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
            fontSize: 12,
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
            backgroundColor: isDarkMode ? '#222' : '#bbb',
            padding: 9,
            borderRadius: 6,
            elevation: 1,
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
            fontSize: 14,
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
            fontSize: 12,
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
        },

        //ERROR
        errorText: {
          color: isDarkMode ? '#ccc' : '#000',
        }
    });


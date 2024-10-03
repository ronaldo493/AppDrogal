import React, { createContext, useContext, useState } from 'react';

//Cria um contexto
const ThemeContext = createContext();

//Provedor do contexto
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

//Hook para usar o contexto
export const useTheme = () => {
    return useContext(ThemeContext);
};

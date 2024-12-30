import React, { createContext, useState, useContext } from 'react';

//Criando o contexto
const StrapiFiliaisContext = createContext();

//Provedor
export const StrapiFiliaisProvider = ({ children }) => {
  const [filiais, setFiliais] = useState([]);

  const contextValue = {
    filiais,
    setFiliais
  }

  return (
    <StrapiFiliaisContext.Provider value={{ contextValue }}>
      {children} 
    </StrapiFiliaisContext.Provider>
  );
};

//Encapsulando 
export const useStrapiFiliais = () => {
    return useContext(FiliaisContext);
}
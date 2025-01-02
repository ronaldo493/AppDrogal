import React, { createContext, useState, useContext } from 'react';

//Criando o contexto
const StrapiContext = createContext();

//Provedor
export const StrapiProvider = ({ children }) => {
  const [filiais, setFiliais] = useState([]);
  const [pontos, setPontos] = useState([]);

  const contextValue = {
    filiais,
    setFiliais,
    pontos,
    setPontos
  }

  return (
    <StrapiContext.Provider value={ contextValue }>
      {children} 
    </StrapiContext.Provider>
  );
};

//Encapsulando 
export const useStrapi = () => {
    return useContext(StrapiContext);
}
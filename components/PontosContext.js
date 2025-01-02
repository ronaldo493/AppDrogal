import React, { createContext, useState, useContext } from 'react';

//Criando o contexto
const PontosContext = createContext();

//Provedor
export const StrapiPontosProvider = ({ children }) => {
  const [pontos, setPontos] = useState([]);

  return (
    <PontosContext.Provider value={{ pontos, setPontos }}>
      {children} 
    </PontosContext.Provider>
  );
};

//Encapsulando 
export const useStrapiPontos = () => {
    return useContext(PontosContext);
}
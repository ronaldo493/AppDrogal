import React, { createContext, useState, useContext } from 'react';

//Criando o contexto
const FiliaisContext = createContext();

//Provedor
export const StrapiFiliaisProvider = ({ children }) => {
  const [filiais, setFiliais] = useState([]);

  return (
    <FiliaisContext.Provider value={{ filiais, setFiliais }}>
      {children} 
    </FiliaisContext.Provider>
  );
};

//Encapsulando 
export const useStrapiFiliais = () => {
    return useContext(FiliaisContext);
}
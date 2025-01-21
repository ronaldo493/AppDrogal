import React, { createContext, useState, useContext } from 'react'

//Criando o contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState("");

    const contextValue = {
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={contextValue}> 
            {children}
        </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}
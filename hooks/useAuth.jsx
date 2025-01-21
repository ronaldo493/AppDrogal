import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import strapiClient from "../services/StrapiClient";

const useAuth = () => {
  const conexao = strapiClient();
  const authStrapi = useAuthContext();

  const { user, setUser } = authStrapi;
  const { token, setToken } = authStrapi;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const conexaoLogin = async (codigoUsuario, senha) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await conexao.post("/auth/local", {
        identifier: codigoUsuario,
        password: senha,
      });
      setToken(response.data.jwt);
      setUser(response.data.user);

      console.log(response.data.user)
      console.log(response.data.jwt)
    } catch (err) {
        setError("Usuário ou senha incorretos");
    } finally {
        setLoading(false);
    }
  };

  const Logout = () => {
    setUser("");
    setToken("");
  }

  return {
    conexaoLogin,
    Logout,
    user,
    token,
    loading,
    error,
  };
};

export default useAuth;

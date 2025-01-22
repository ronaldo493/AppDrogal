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

      console.log(response);
      const { jwt, user } = response.data;

      await setToken(jwt);
      setUser({
        ...user,
        role: user.role?.name || 'default', // Adiciona o nome do papel ao estado
      });
  
      console.log(user.role?.name);
    } catch (err) {
        setError("Usuário ou senha incorretos");
    } finally {
        setLoading(false);
    }
  };

  return {
    conexaoLogin,
    user,
    token,
    loading,
    error,
  };
};

export default useAuth;

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

      await setUser(user);
  
      console.log(user.role?.name);
    } catch (err) {
        setError("Usuário ou senha incorretos");
    } finally {
        setLoading(false);
    }
  };

  const resetPassword = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await conexao.put("/auth/reset-password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      console.log("Senha redefinida com sucesso", response.data);
    } catch (err) {
      setError("Erro ao redefinir a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    conexaoLogin,
    resetPassword,
    user,
    token,
    loading,
    error,
  };
};

export default useAuth;

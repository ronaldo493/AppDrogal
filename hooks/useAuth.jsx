import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import strapiClient from "../services/StrapiClient";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const conexao = strapiClient();
  const authStrapi = useAuthContext();

  //Logoff
  const { clearToken } = useAuthContext();

  
  //Mensagem
  const [message, setMessage] = useState(null);

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

      const { jwt, user } = response.data;

      console.log(jwt)

      await setToken(jwt);
      await setUser(user);

      checkToken(jwt)
  
    } catch (err) {
        setError("Usuário ou Senha incorretos");
    } finally {
        setLoading(false);
    }
  };

  const checkToken = (tokenReceived) => {
    if (tokenReceived && typeof tokenReceived === 'string' && tokenReceived.includes('.')) {
      try {
        const desctJwt = jwtDecode(tokenReceived); //Destrututurando JWT
        console.log(desctJwt)
        const iat = desctJwt.iat;
        const expirationTime = 60;
        const exp = iat + expirationTime; //Tempo de expiração
        const currentTime = Math.floor(Date.now() / 1000); //Tempo atual em segundos
        
        console.log("Data de criação (iat):", iat);
        console.log("Data de expiração (exp):", exp);
  
        //Verifica o token e redireciona se inválido
        if (currentTime >= exp) {
          setMessage("Sua sessão expirou. Você será redirecionado para o login.")
          
          setTimeout(() => {
            clearToken();
          }, 3000);
        } else {
          console.log("Token Válido")
        }
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
      }
    }
  }

  return {
    checkToken,
    message,
    conexaoLogin,
    user,
    token,
    loading,
    error,
  };
};

export default useAuth;

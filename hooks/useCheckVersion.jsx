import { useState, useEffect } from 'react'
// import { Alert, Linking } from 'react-native';
import strapiClient from "../services/StrapiClient";
import Constants from "expo-constants";

const useCheckVersion = () => {
    const conexao = strapiClient();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //Versão Atual
    const currentVersion = Constants.expoConfig.version;

    const checkVersion = async () => {
        setLoading(true),
        setError(null)

        try {
            const response = await conexao.get('/update');
            console.log("Dados da resposta:", response.data);

            const { versao, apk, required } = response.data;
      
            if (versao && versao !== currentVersion) {
              console.log(`Nova versão disponível: ${versao}`);
              
      
            //   //Notificar o usuário sobre a atualização
            //   Alert.alert(
            //     "Nova Atualização Disponível",
            //     `A versão ${versao} está disponível. ${required ? "Esta atualização é obrigatória." : "Deseja atualizar agora?"}`,
            //     [
            //         { text: "Agora Não", style: "cancel" },
            //         { 
            //             text: "Atualizar", 
            //             onPress: () => Linking.openURL(apk?.url) 
            //         }
            //     ]
            //   );
            }
          } catch (err) {
            console.log("Erro ao fazer a requisição:", err);
            const errorMessage = err.response?.data?.message || "Erro ao verificar a versão";
            setError(errorMessage);
          } finally {
            setLoading(false);
          }
    }
    
    useEffect(() => {
        console.log("Checando versão...");
        checkVersion();
      }, []);

    return {
        currentVersion,
        error,
        loading
    }
}

export default useCheckVersion
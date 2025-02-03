import { useState, useEffect } from 'react'
import { Alert, Linking } from 'react-native';
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
            const response = await conexao.get('/update?populate=apk');

            const { versao, apk, required } = response.data.data;
      
            if (versao && versao !== currentVersion) {

              //Notificar o usuário sobre a atualização
              Alert.alert(
                "Nova Atualização Disponível",
                `A versão ${versao} está disponível. ${required ? "Esta atualização é obrigatória." : "Deseja atualizar agora?"}`, 
                required === true
                ?  [
                      { 
                          text: "Atualizar", 
                          onPress: () => {
                            if (apk && Array.isArray(apk) && apk.length > 0 && apk[0]?.url) {
                              const baseUrl = conexao.defaults.baseURL.replace("/api", "");
                              const apkUrl = `${baseUrl}${apk[0].url}`;
                              Linking.openURL(apkUrl);
                            } else {
                                Alert.alert("Erro", "Não foi possível encontrar o link de atualização.");
                            }
                        }
                      }
                  ]
                  : [ //Se não for obrigatória, mostra as duas opções
                    { text: "Agora Não", style: "cancel" },
                    { 
                        text: "Atualizar", 
                        onPress: () => {
                            if (apk && Array.isArray(apk) && apk.length > 0 && apk[0]?.url) {
                                const baseUrl = conexao.defaults.baseURL.replace("/api", "");
                                const apkUrl = `${baseUrl}${apk[0].url}`;
                                
                                Linking.openURL(apkUrl);
                            } else {
                                Alert.alert("Erro", "Não foi possível encontrar o link de atualização.");
                            }
                        }
                    }
                ]
              );
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
        checkVersion();      
      }, []);

    return {
        currentVersion,
        error,
        loading
    }
}

export default useCheckVersion
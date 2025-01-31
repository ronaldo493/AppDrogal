import { useState } from 'react'
import useAuth from './useAuth';
import strapiClient from '../services/StrapiClient';

const useSugestao = () => {
    const conexao = strapiClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    

    const postSugestao = async (email, sugestao) => {
        setLoading(true);
        setError(null);
        
        try {
            //Envio no Strapi
            const response = await conexao.post("/sugestoes", {
                data: {
                    user: user.username,
                    setor: user.setor,
                    email: email,
                    sugesao: sugestao    
                },
            });

        } catch(err){
            const errorMessage = err.response?.data?.message || "ERRO AO ENVIAR SUGESTÃO. TENTE NOVAMENTE.";;
            setError(errorMessage);
            setTimeout(() => {
                setError(false);
              }, 5000)
        } finally {
            setLoading(false);
        }
    }

    return{
        postSugestao,
        loading,
        error,
        setError
    }
}

export default useSugestao;
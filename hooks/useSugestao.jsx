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
                    sugestao: sugestao    
                },
            });

            console.log(response)

        } catch(err){
            const errorMessage = err.response?.data?.message;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return{
        postSugestao,
        loading,
        error
    }
}

export default useSugestao;
import { useEffect, useState } from "react";
import { useStrapiContext } from "../context/StrapiContext";
import strapiClient from "../services/StrapiClient";
import usePagination from "./usePagination";

const usePontos = () => {
    
    const conexao = strapiClient();
    const suporteStrapi = useStrapiContext();

    const { pontos, setPontos } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    //BUSCA DE DADOS
    const getPontos = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await conexao.get('/pontos-interesses');

          const { data: responseData, meta } = response.data

          console.log(meta)

          setPontos((prevPontos) => [...prevPontos, ...responseData])

        } catch (err) {
            setError(err.message || "Erro desconhecido");
        } finally {
          setLoading(false);
        }
      };


    //SALVAR DADOS
    const postPontos = async (novoPonto) => {
        setLoading(true);
        setError(null);

        try {
            const response = await strapiClient().post("/pontos-interesses", {
                data: novoPonto,
            });

            const savedPonto = response.data.data;
            setPontos((prevPontos) => [...prevPontos, savedPonto])

            console.log("Ponto salvo com sucesso:", savedPonto.attributes?.descricao);
        } catch(err) {
            console.error("Erro ao salvar o ponto:", err);
            setError(err.response?.data?.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
        //Verifica se o estado de pontos está vazio antes de buscar os dados
        if (pontos.length === 0) {
            getPontos();
        }
    }, [pontos])

    return { 
        pontos,
        error,
        loading,
        postPontos,
    }
}

export default usePontos;
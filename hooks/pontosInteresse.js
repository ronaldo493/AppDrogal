import { useState, useEffect, useCallback } from "react";
import { useStrapi } from "../components/StrapiContext";
import { fetchPaginatedData } from "../services/Pagination";
import strapiClient from "../services/StrapiClient";

const usePontos = () => {
    
    const suporteStrapi = useStrapi();

    const { pontos, setPontos } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    //BUSCA DE DADOS
    const getPontos = useCallback(async () => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await fetchPaginatedData('/pontos-interesses');

          setPontos(data);
    
          console.log("Todos os dados das filiais salvos no estado:");
          data.forEach(point => {
            console.log(point.categoria);  //Exibe o código
          });
        } catch (err) {
            console.error("Erro ao buscar Pontos:", err);
            setError(err.message || "Erro desconhecido");
        } finally {
          setLoading(false);
        }
      }, [setPontos]);


    //SALVAR DADOS
    const postPontos = useCallback(async (novoPonto) => {
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
    }, []);

    useEffect(() => {
        getPontos();
    }, []);

    return { pontos, error, loading, getPontos, postPontos }
}

export default usePontos;
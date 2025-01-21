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

    const pageSize = 100;
    const { nextPage, currentPage, setDataMeta, hasMore } = usePagination(1, "paginationPontos");

    //BUSCA DE DADOS
    const getPontos = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await conexao.get('/pontos-interesses', {
            params: {
              pagination: {
                page: currentPage,
                pageSize,
              },
            },
          });

          const { data: responseData, meta } = response.data;

          setDataMeta(meta)
      
          nextPage();

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

        } catch(err) {
            console.error("Erro ao salvar o ponto:", err);
            setError(err.response?.data?.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      if(hasMore) {
        getPontos();
      }
    }, [currentPage, hasMore])

    return { 
        pontos,
        error,
        loading,
        postPontos,
    }
}

export default usePontos;
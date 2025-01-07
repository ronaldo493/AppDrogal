import { useEffect, useState } from "react";
import { useStrapi } from "../components/StrapiContext";
import { fetchPaginatedData } from "../services/Pagination";
import strapiClient from "../services/StrapiClient";

const usePontos = () => {
    
    const suporteStrapi = useStrapi();

    const { pontos, setPontos } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    //BUSCA DE DADOS
    const getPontos = async () => {

      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchPaginatedData('/pontos-interesses');

        setPontos(data);

      } catch (err) {
        console.error("Erro ao buscar Pontos:", err);
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }

    };

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

    useEffect(() => { pontos.length == 0 && getPontos() }, [])

    return { 
      pontos, 
      error, 
      loading, 
      getPontos, 
      postPontos 
    }

}

export default usePontos;
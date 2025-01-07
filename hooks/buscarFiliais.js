import { useState, useEffect } from "react";
import { useStrapi } from "../components/StrapiContext";
import { fetchPaginatedData } from "../services/Pagination";

const useFiliais = () => {
    const suporteStrapi = useStrapi();

    const { filiais, setFiliais } = suporteStrapi;

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const getFiliais = async () => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await fetchPaginatedData('/informacoeslojas');

          setFiliais(data);
    
          console.log("Todos os dados das filiais salvos:");
          data.forEach(filial => {
            console.log(filial.codigofilial);  //Exibe o código
          });
        } catch (err) {
            console.error("Erro ao buscar filiais:", err);
            setError(err.message || "Erro desconhecido");
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        //Verifica se o estado de filiais está vazio antes de buscar os dados
        if (filiais.length === 0) {
            getFiliais();
        }
    }, [filiais])

    return { filiais, error, loading }
}

export default useFiliais;